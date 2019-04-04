const groupData = require('./groupData')
module.exports = function groupDataPrepare(groupableVectorsArray, configs, dataset) {
  // Hello
  // Create variable to store output
  var chartData = []

  console.log(dataset, "GVA:", groupableVectorsArray)

  console.log("")

  console.log("GVA[0]:", groupableVectorsArray[0])
  console.log("CONFNIGS")
  console.log(configs)

  // Find min/max in primary dataset
  // All of the vectors have the same names
  // so we can look at the first
  const first = groupableVectorsArray[0]
  var absMin = first[0].name
  var absMax = first[first.length - 1].name
  var rangeMin = configs[dataset].settings.min
  var rangeMax = configs[dataset].settings.max
  

  const numberZoom = configs[dataset].settings.numberZoom

  if (configs[dataset].dataType === 'number') {
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
    chartData = groupableVectorsArray
  }

  return {
    chartData: chartData,
    rangeMin: rangeMin,
    rangeMax: rangeMax,
    absMin: absMin,
    absMax: absMax
  }
}