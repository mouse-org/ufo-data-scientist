const months = require('./dateOrders').months

const daysOfTheWeek = [
  'Sunday', 'Monday', 'Tuesday',
  'Wednesday', 'Thursday', 'Friday', 'Saturday'
]

function identity(d) { return d }

function amPm(d) {
  if (d < 12) {
    if (d === 0) {
      return '12 am'
    } else {
      return '' + d + ' am'
    }
  } else if (d === 12) {
    return '12 pm'
  } else {
    return '' + (d - 12) + ' pm'
  }
}

module.exports = [
  { name: 'year', method: 'getFullYear', transformation: identity },
  { name: 'month', method: 'getMonth', transformation: d => months[d]},
  { name: 'date', method: 'getDate', transformation: identity },
  { name: 'dayOfTheWeek', method: 'getDay', transformation: d => daysOfTheWeek[d] },
  { name: 'hour', method: 'getHours', transformation: amPm },
  { name: 'minute', method: 'getMinutes', transformation: identity }
]