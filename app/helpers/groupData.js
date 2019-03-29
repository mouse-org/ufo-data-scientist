  
  
module.exports = function groupData(
  sortedData, groups, rangeMin, rangeMax
) {

    console.log("GROUPS:", groups)
    var groupedData = [];
    // Number Data Sets:
    //   duration_minutes,
    //    city_latitude,
    //    city_longitude

    if (sortedData[0]) {
      roundMin = Math.floor(rangeMin)
      roundMax = Math.ceil(rangeMax)
    }

    var spacing = (roundMax - roundMin) / groups;

    // Make a new array with fewer datapoints
    for (var i = roundMin; i <= roundMax + spacing; i += spacing) {
      // 🚸 Don't remember what this was preventing
      if (i.length > 100) {
        return
      }
      //console.log("i:", i, typeof i)
      // 🚸 not sure if there is anything still NaN
      var name = isNaN(i) ? 0 : parseFloat(i).toFixed(2)
      groupedData.push({name: name, value: 0})
    }

    console.log("*SD:", sortedData)
    console.log("*GD:", groupedData)


    for (var i = 0, j = 0; i < sortedData.length; i++) {

      const s = sortedData[i]
      const g = groupedData[j]

      // Remove datapoints that are out of range
      if (s.name < roundMax && s.name > roundMin) {
        //console.log("*i:", i)
        //console.log("*j:", j)
        //console.log("SD:", sortedData[i])
        //console.log("GDL:", groupedData.length)
        //console.log("GD:", groupedData[j])

        if (s.name > g.name) {
          j++
          i--
          continue
        }
        g.value += s.value
      }
    }
    return groupedData
  }