function breakApartData(data, property, metric) {
  var propertyList = [];
  for (var i in data) {
    var p = data[i];
    var found = false;
    for (var j in propertyList) {
      var s = propertyList[j];
      if (p[property] === s[property]) {
        s.sightings++;
        found = true;
        break;
      }
    }
    if (!found) {
      var o = {};
      o[property] = p[property];
      o[metric] = 1;
      propertyList.push(o);
    }
  }
  return propertyList;
}

module.exports = breakApartData;
