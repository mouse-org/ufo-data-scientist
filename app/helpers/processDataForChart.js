const datePartOptions = require('./datePartOptions')
const extractDataForSelectedProperty = require('./extractDataForSelectedProperty')
const dataStructures = require('./dataStructures')
const vectorsFromSetAndValues = require('./vectorsFromSetAndValues')
const groupDataPrepare = require('./groupDataPrepare')
const removeExcluded = require('./removeExcluded')

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
    var processSecondary = (configs.secondary && configs.secondary.dataType === 'number')
    
    if (processSecondary) {
      const secondaryVectorsArray = vectorsFromSetAndValues(configs.secondary, false)
      // If excludedValue is included in vectors then remove it:
      const secondaryRemoved = removeExcluded(secondaryVectorsArray, configs.secondary)
      var secondaryGroupableVectorsArray = secondaryRemoved.groupable
      var secondaryExcludedArray = secondaryRemoved.excluded     

      const prepared = groupDataPrepare(secondaryGroupableVectorsArray, configs, 'secondary')
      
      configs.secondary.groups = prepared.chartData[0]
      configs.secondary.settings.min = prepared.rangeMin
      configs.secondary.settings.max = prepared.rangeMax
      configs.secondary.settings.absMin = prepared.absMin
      configs.secondary.settings.absMax = prepared.absMax
    
    }

    console.log("SECONDARY CONFIGS:")
    console.log(configs.secondary)

    // Turn array of values into vectors with values and frequency
    const vectorsArray = vectorsFromSetAndValues(configs.primary, configs.secondary)

    
    const removed = removeExcluded(vectorsArray, configs.primary)
    var groupableVectorsArray = removed.groupable
    var excludedArray = removed.excluded

    var primaryGroupedData = groupDataPrepare(groupableVectorsArray, configs, 'primary')
    var chartData = primaryGroupedData.chartData
    var rangeMin = primaryGroupedData.rangeMin
    var rangeMax = primaryGroupedData.rangeMax
    var absMin = primaryGroupedData.absMin
    var absMax = primaryGroupedData.absMax

     

    // Need to extract value above and add in 'Unknown'
    // here because of different excluded values in data
    // 🚸 'bar' chart type is singled out here
    if (excludedArray.length > 0 && (state.chartType === 'bar')) {
      for (var i in chartData) {
        chartData[i].push({name: 'Unknown', value: excludedArray[i]})
      }
    }

    const dPI = state.dataPropertyIndex.primary
    var fullDatasetSettings = state.datasetSettings
    const currentPrimaryDatasetSettings = fullDatasetSettings.primary[dPI]
    const updatedPrimaryDatasetSettings = {
      min: rangeMin,
      max: rangeMax,
      absMin: absMin,
      absMax: absMax,
    }

    if (processSecondary) {
      const sDPI = state.dataPropertyIndex.secondary
      const currentSecondaryDatasetSettings = fullDatasetSettings.secondary[sDPI]
      const updatedSecondaryDatasetSettings = {
        min: configs.secondary.settings.min,
        max: configs.secondary.settings.max,
        absMin: configs.secondary.settings.absMin,
        absMax: configs.secondary.settings.absMax
      }

      fullDatasetSettings.secondary[sDPI] = Object.assign(
        {},
        currentSecondaryDatasetSettings,
        updatedSecondaryDatasetSettings
      )
    }

    fullDatasetSettings.primary[dPI] = Object.assign(
      {},
      currentPrimaryDatasetSettings,
      updatedPrimaryDatasetSettings
    )

    var newState = {
      datasetSettings: fullDatasetSettings,
      chartData: chartData
    }
    console.log("## NS:", newState)
    return newState
  })
}