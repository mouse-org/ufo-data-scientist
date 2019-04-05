//const datePartOptions = require('./datePartOptions')
const datePartFromDate = require('./datePartFromDateString')
const datePartOptions = require('./datePartOptions')
const dataStructures = require('./dataStructures')
//const groupDataPrepare = require('./groupDataPrepare')
//const removeExcluded = require('./removeExcluded')
const vectorGroupsFromExtracted = require('./vectorGroupsFromExtracted')

module.exports = function processDataForChart(rawData) {
  this.setState((state, props) => {

    var sec = state.secondaryDataProperty

    var ds = sec ? 'secondary' : 'primary'
    var index = state.dataPropertyIndex[ds]
    var datasetSettings = state.datasetSettings
    const dsSettings = datasetSettings[ds][index]
    var dateIndex = dsSettings.datePartIndex

    // just selected datapoint
    var extracted = rawData.map(d => d[index])
    
    const options = {
      dataType: dataStructures[index].type,
      exclude: dataStructures[index].exclude,
      datePartName: datePartOptions[dateIndex].name,
      min: dsSettings.min,
      max: dsSettings.max
    }

    if (options.dataType === 'datetime') {
      extracted = extracted.map((i) => {
        return datePartFromDate(i, dateIndex)
      })
    }

    const numberOfGroups = dsSettings.numberZoom
    const groupsData = vectorGroupsFromExtracted(extracted, numberOfGroups, options)

    var updatedDS = datasetSettings
    if (!sec) {
      var chartData = [groupsData.groupedVectors]

      updatedDS[ds][index].absMin = groupsData.absMin
      updatedDS[ds][index].absMax = groupsData.absMax
      if (options.min === false) {
        updatedDS[ds][index].min = groupsData.absMin
      }
      if (options.max === false) {
        updatedDS[ds][index].max = groupsData.absMax
      }
    } else {
      
    }

    var newState = {
      datasetSettings: updatedDS,
      chartData: chartData
    }
    return newState
  })
}