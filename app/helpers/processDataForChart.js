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
    var datasetSettings = state.datasetSettings
    var priIndex = state.dataPropertyIndex.primary
    var secIndex = state.dataPropertyIndex.secondary

    var options

    function singleDsToChartData(ds, conditionFunction) {
      // just selected datapoint

      var index = state.dataPropertyIndex[ds]
      const dsSettings = datasetSettings[ds][index]
      var dateIndex = dsSettings.datePartIndex

      var extracted = []
      if (conditionFunction) {
        rawData.map(d => {
          if (conditionFunction(d)) {
            extracted.push(d[index])
          }
        })
      } else {
        extracted = rawData.map(d => d[index])
      }     
      
      options = {
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

      return groupsData
    }

    const primaryGroupsData = singleDsToChartData('primary', false)

    var updatedDS = datasetSettings
    var combinedGroupsData = []
    var chartData = []
    if (sec) {
      const secondaryGroupsData = singleDsToChartData('secondary', false)

      for (var i in secondaryGroupsData.groupedVectors) {
        const name = secondaryGroupsData.groupedVectors[i].name

        // This function determines whether data from the
        // primary set is in this secondary set
        var condFunc = function(secVal, secIndex, dataItem) {
          if (dataItem[secIndex] === secVal) {
            return true
          }
          return false
        }.bind(this, name, secIndex)

        combinedGroupsData.push(
          singleDsToChartData('primary', condFunc).groupedVectors
        )
      }

      //console.log("COMBINED:", combinedGroupsData)

      chartData = combinedGroupsData

      updatedDS.secondary[secIndex].absMin = secondaryGroupsData.absMin
      updatedDS.secondary[secIndex].absMax = secondaryGroupsData.absMax
      const priDS = updatedDS.secondary[secIndex]
      if (priDS.min === false) {
        updatedDS.secondary[secIndex].min = secondaryGroupsData.absMin
      }
      if (priDS.max === false) {
        updatedDS.secondary[secIndex].max = secondaryGroupsData.absMax
      }

    } else {
      chartData.push(primaryGroupsData.groupedVectors)
    }

    updatedDS.primary[priIndex].absMin = primaryGroupsData.absMin
    updatedDS.primary[priIndex].absMax = primaryGroupsData.absMax
    const priDS = updatedDS.primary[priIndex]
    if (priDS.min === false) {
      updatedDS.primary[priIndex].min = primaryGroupsData.absMin
    }
    if (priDS.max === false) {
      updatedDS.primary[priIndex].max = primaryGroupsData.absMax
    }

    var newState = {
      datasetSettings: updatedDS,
      chartData: chartData
    }
    return newState
  })
}