function breakApartData(data, property, metric, mutation) {
  var propertyList = [];
  for (var i in data) {
    var dataPoint = data[i];
    dataPointProperty = dataPoint[property];

    //console.log("")
    //console.log(property)
    //console.log(mutation)
  
    if (mutation) {
      //console.log("TRUE")
      dataPointProperty = mutation(dataPointProperty);
    } else {
      //console.log("FALSE")
    }
    var found = false;
    for (var j in propertyList) {
      var s = propertyList[j];
      if (dataPointProperty === s[property]) {
        s.sightings++;
        found = true;
        break;
      }
    }
    if (!found) {
      var o = {};
      o[property] = dataPointProperty;
      o[metric] = 1;
      propertyList.push(o);
    }
  }
  return propertyList;
}

module.exports = breakApartData;
