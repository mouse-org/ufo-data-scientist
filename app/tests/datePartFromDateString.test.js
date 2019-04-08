const dataStructures = require('../helpers/dataStructures')
const dpfds = require('../helpers/datePartFromDateString')
// data, dataIndex, dateIndex

function arrayFromData(dataPoint) {
  var a = []
  for (var j in dataStructures) {
    a.push(dataPoint[dataStructures[j].name])
  }
  return a
}

const data = [{
  "state": "IN",
  "date_time": "2016-12-22T10:00:00",
  "shape": "circle",
  "duration_minutes": 0.01,
  "city_latitude": 37.98475253,
  "city_longitude": -87.51397042
},
{
  "state": "OH",
  "date_time": "2016-04-04T01:49:00",
  "shape": "light",
  "duration_minutes": 0.01,
  "city_latitude": 39.73540852,
  "city_longitude": -84.16762781
},
{
  "state": "FL",
  "date_time": "2015-11-07T00:20:00",
  "shape": "flash",
  "duration_minutes": 0.01,
  "city_latitude": 27.8178,
  "city_longitude": -81.8245
}].map(arrayFromData)

/*
Date Part Options:
  Year: 0
  Month: 1
  Month and Year: 2
  Date Number: 3
  Day of the Week: 4
  Hour: 5
  Minute: 6
*/


test(`
2016-12-22T10:00:00 extracting Year should be '2016'
`, () => {
  const dp = dpfds(data[0][1], 0)
  expect(dp).toEqual('2016')
})

test(`
2016-12-22T10:00:00 extracting Month should be 'December'
`, () => {
  const dp = dpfds(data[0][1], 1)
  expect(dp).toEqual('December')
})

test(`
2015-11-07T00:20:00 extracting Month and Year should be 'November 2015'
`, () => {
  const dp = dpfds(data[2][1], 2)
  expect(dp).toEqual('November 2015')
})

test(`
2015-11-07T00:20:00 extracting Date Number should be '7'
`, () => {
  const dp = dpfds(data[2][1], 3)
  expect(dp).toEqual('7')
})

test(`
2015-11-07T00:20:00 extracting Day of the Week should be 'Saturday'
`, () => {
  const dp = dpfds(data[2][1], 4)
  expect(dp).toEqual('Saturday')
})

test(`
2016-04-04T01:49:00 extracting Hour should be '1 am'
`, () => {
  const dp = dpfds(data[1][1], 5)
  expect(dp).toEqual('1 am')
})

test(`
2016-04-04T01:49:00 extracting Minute should be '49'
`, () => {
  const dp = dpfds(data[1][1], 6)
  expect(dp).toEqual('49')
})

test(`
2016-04-04T01:49:00 with no date index
`, () => {
  const dp = dpfds(data[1][1], undefined)
  expect(dp).toEqual(null)
})


test(`
No date with extracting Minute
`, () => {
  const dp = dpfds(undefined, 6)
  expect(dp).toEqual(null)
})

test(`
2016-12-22T10:00:00 extracting Year should be '2016'
`, () => {
  const dp = dpfds('2016-12-22T10:00:00', 0)
  expect(dp).toEqual('2016')
})