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
  {
    textName: 'Year',
    name: 'year',
    method: 'getFullYear',
    transformation: identity
  },
  {
    textName: 'Month',
    name: 'month',
    method: 'getMonth',
    transformation: d => months[d]
  },
  {
    textName: 'Month and Year',
    name: 'monthAndYear',
    method: false,
    transformation: d => `${months[d.getMonth()]} ${d.getFullYear()}`
  },
  {
    textName: 'Date Number',
    name: 'date',
    method: 'getDate',
    transformation: identity
  },
  {
    textName: 'Day of the Week',
    name: 'dayOfTheWeek',
    method: 'getDay',
    transformation: d => daysOfTheWeek[d]
  },
  {
    textName: 'Hour',
    name: 'hour',
    method: 'getHours',
    transformation: amPm
  },
  {
    textName: 'Minute',
    name: 'minute',
    method: 'getMinutes',
    transformation: identity
  }
]