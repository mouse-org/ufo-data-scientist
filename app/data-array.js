const fs = require('fs');
const data = require('./fullData.js');

//console.log(data);

var newData = [];

for (var i in data) {
  var d = data[i]
  newData.push([d.state, d.date_time, d.shape, d.duration_minutes, d.city_latitude, d.city_longitude])
}

fs.writeFile("./newData.js", JSON.stringify(newData), e => console.log(e));