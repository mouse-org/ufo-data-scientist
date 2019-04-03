const datePartOptions = require('./datePartOptions')
const extractDataForSelectedProperty = require('./extractDataForSelectedProperty')
const dataStructures = require('./dataStructures')
const vectorsFromSetAndValues = require('./vectorsFromSetAndValues')
const groupData = require('../helpers/groupData')

module.exports = function processDataForChart(data) {
  const dataset = 'primary'

  const collectConfig = (ds) => {
    if (ds === 'secondary' && !this.state.secondaryDataProperty) {
      return false
    }
    const index = this.state.dataPropertyIndex[ds]
    const dataType = this.dataType(index)
    const settings = this.state.datasetSettings[ds][index]
    const datePart = datePartOptions[settings.datePartIndex].name
    const propertyData = extractDataForSelectedProperty(
      data, index, dataType, datePart
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

  const chartType = this.state.chartType

  // Turn array of values into vectors with values and frequency
  const vectorsArray = vectorsFromSetAndValues(configs.primary, configs.secondary)

  console.log("VECTORS ARRAY:", vectorsArray)


  var groupableVectorsArray = vectorsArray
  // If excludedValue is included in vectors then remove it:
  /*
  
  var excluded = null
  var excludedArray = []
  for (i in vectorsArray) {
    const vectors = vectorsArray[i]
    if (vectors[0] && vectors[0].name === excludedValue) {
      groupableVectors = vectors.slice(1, vectors.length)
      excludedArray.push = vectors.slice(0, 1)[0].value
    }
  }
  */

  var chartDataArray
  const minEachDS = groupableVectorsArray.map(i => i[0])
  var absMin = groupableVectors[0].name
  var absMax = groupableVectors[groupableVectors.length - 1].name
  if (dataType === 'number') {
    absMin = Math.floor(absMin)
    absMax = Math.ceil(absMax)

    if (!rangeMin) { rangeMin = absMin }
    if (!rangeMax) { rangeMax = absMax }

    chartData = groupData(
      groupableVectors, numberZoom, rangeMin, rangeMax
    );
  //} else if (dataType === 'datetime') {
      // 🚸 Maybe in the future will group date data
      // Date/Time Data Sets: date_time)
      //return this.groupData(sortedData, 'string', groups)
  } else {
    chartData = groupableVectors
  }

  // Need to extract value above and add in 'Unknown'
  // here because of different excluded values in data
  /*
  if (excludedArray.length > 0 && (chartType === 'bar')) {
    chartData.push({name: 'Unknown', value: excluded})
  }
  */

  //console.log("CHART DATA:", chartData)

  this.setState((state, props) => {
    var fullDatasetSettings = state.datasetSettings
    const currentDatasetSettings = fullDatasetSettings[dataset][dataPropertyIndex]
    const updatedDatasetSettings = {
      min: rangeMin,
      max: rangeMax,
      absMin: absMin,
      absMax: absMax,
      numberZoom: numberZoom
    }

    fullDatasetSettings[dataset][dataPropertyIndex] = Object.assign(
      {}, currentDatasetSettings, updatedDatasetSettings
    )

    var updatedChartData = state.chartData
    updatedChartData[dataset] = chartData

    var newState = {
      datasetSettings: fullDatasetSettings,
      chartData: updatedChartData
    }
    //console.log("## NS:", newState)
    return newState
  })
}