const uuidv4 = require('uuid/v4');


function data(shape, sightings) {

  return {
    dataGroupId: uuidv4(),
    dataGroupName: shape,
    customGroupName: false,
    totalSightings: sightings,
    editing: false,
    collapsed: false,
    dataPoints: []
  }
}

module.exports = {
  data: data
}
