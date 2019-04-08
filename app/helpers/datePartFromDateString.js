const datePartOptions = require('./datePartOptions')

module.exports = function datePartFromDateString(dataPoint, dateIndex) {  
  if (
    dateIndex === undefined ||
    !dataPoint) {
    return null
  }

  const datePart = datePartOptions[dateIndex]
  const transformation = datePart.transformation

  const itemDate = new Date(dataPoint)

  if (datePart.method) {
    var itemDatePart = itemDate[datePart.method]()
  } else {
    itemDatePart = itemDate
  }

  return transformation(itemDatePart).toString()
}