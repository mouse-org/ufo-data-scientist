const datePartOptions = require('./datePartOptions')
const extractDataForSelectedProperty = require('./extractDataForSelectedProperty')
const dataStructures = require('./dataStructures')
const vectorsFromSetAndValues = require('./vectorsFromSetAndValues')
const groupData = require('../helpers/groupData')

module.exports = function processDataForChart(rawData) {
  this.setState((state, props) => {

    const collectConfig = (ds) => {
      if (ds === 'secondary' && !state.secondaryDataProperty) {
        return false
      }
      const index = state.dataPropertyIndex[ds]
      const dataType = this.dataType(index)
      const settings = state.datasetSettings[ds][index]
      const datePart = datePartOptions[settings.datePartIndex].name
      const propertyData = extractDataForSelectedProperty(
        rawData, index, dataType, datePart
      )
      return {
        // Take values for selected properties out of full data
        data: propertyData,
        settings: settings,
        set: [...new Set(propertyData)], // Unique values from selectedData
        exclude: dataStructures[index].exclude,
        dataType: dataType,
        datePart: datePart
      }
    }

    const datasets = ['primary', 'secondary']
    var configs = {}
    for (i in datasets) {
      configs[datasets[i]] = collectConfig(datasets[i])
    }

    // Turn array of values into vectors with values and frequency
    const vectorsArray = vectorsFromSetAndValues(configs.primary, configs.secondary)

    
    // If excludedValue is included in vectors then remove it:
    var groupableVectorsArray = []
    var excludedArray = []
    for (i in vectorsArray) {
      const vectors = vectorsArray[i]
      if (vectors[0] && vectors[0].name === configs.primary.exclude) {
        groupableVectorsArray.push(vectors.slice(1, vectors.length))
        excludedArray.push(vectors.slice(0, 1)[0].value)
      }
    }

    // Create variable to store output
    var chartData = []

    // Find min/max in primary dataset
    // All of the vectors have the same names
    // so we can look at the first
    const first = groupableVectorsArray[0]
    var absMin = first[0].name
    var absMax = first[first.length - 1].name
    var rangeMin = configs.primary.settings.min
    var rangeMax = configs.primary.settings.max
    const numberZoom = configs.primary.settings.numberZoom

    if (configs.primary.dataType === 'number') {
      absMin = Math.floor(absMin)
      absMax = Math.ceil(absMax)

      if (!rangeMin) { rangeMin = absMin }
      if (!rangeMax) { rangeMax = absMax }

      for (var i in groupableVectorsArray) {
        var datasetChartData = groupData(
          groupableVectorsArray[i], numberZoom, rangeMin, rangeMax
        );
        chartData.push(datasetChartData)
      }
    
    //} else if (dataType === 'datetime') {
        // 🚸 Maybe in the future will group date data
        // Date/Time Data Sets: date_time)
        //return this.groupData(sortedData, 'string', groups)
    } else {
      chartData = groupableVectors
    }

    // Need to extract value above and add in 'Unknown'
    // here because of different excluded values in data
    // 🚸 'bar' chart type is singled out here
    if (excludedArray.length > 0 && (state.chartType === 'bar')) {
      for (var i in chartData) {
        chartData[i].push({name: 'Unknown', value: excludedArray[i]})
      }
    }

    const dataPropertyIndex = state.dataPropertyIndex.primary
    var fullDatasetSettings = state.datasetSettings
    const currentPrimaryDatasetSettings = fullDatasetSettings.primary[dataPropertyIndex]
    const updatedPrimaryDatasetSettings = {
      min: rangeMin,
      max: rangeMax,
      absMin: absMin,
      absMax: absMax,
      numberZoom: numberZoom
    }

    fullDatasetSettings.primary[dataPropertyIndex] = Object.assign(
      {},
      currentPrimaryDatasetSettings,
      updatedPrimaryDatasetSettings
    )

    var newState = {
      datasetSettings: fullDatasetSettings,
      chartData: chartData
    }
    //console.log("## NS:", newState)
    return newState
  })
}