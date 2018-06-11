function getShapes(data) {
  var shapes = [];
  for (var i in data) {
    var p = data[i];
    var found = false;
    for (var j in shapes) {
      var s = shapes[j];
      if (p.shape === s.shape) {
        s.sightings++;
        found = true;
        break;
      }
    }
    if (!found) {
      shapes.push({
        shape: p.shape,
        sightings: 1
      })
    }
  }
  return shapes;
}

module.exports = getShapes;
