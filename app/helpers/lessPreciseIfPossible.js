module.exports = function lessPreciseIfPossible(groupedData) {

  var sameTo1 = false
  var prev = false
  for (var i in groupedData) {
    if (
      parseFloat(groupedData[i].name).toFixed(1)
      ===
      parseFloat(prev).toFixed(1)
    ) {
      sameTo1 = true;
      break;
    }
    prev = groupedData[i].name
  }

  if (!sameTo1) {
    groupedData.map(i => i.name = parseFloat(parseFloat(i.name).toFixed(1)))
    var sameTo0 = false
    prev = false
    for (var i in groupedData) {
      if (
        Math.round(parseFloat(groupedData[i].name))
        ===
        Math.round(parseFloat(prev))
      ) {
        sameTo0 = true;
        break;
      }

      prev = groupedData[i].name
    }

    if (!sameTo0) {
      groupedData.map(i => i.name = Math.round(parseFloat(i.name)))
    }
  }

  return groupedData
}