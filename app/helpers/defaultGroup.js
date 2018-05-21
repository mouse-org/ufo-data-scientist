const uuidv4 = require('uuid/v4');


function data(shape, sightings) {
  let metaData = {
    dataPointId: uuidv4()
  }

  return {
    dataGroupId: uuidv4(),
    dataGroupName: shape,
    customGroupName: false,
    totalSightings: sightings,
    editing: false,
    collapsed: false,
    dataPoints: [Object.assign({}, metaData, shape)]
  }
}

module.exports = {
  data: data
}
