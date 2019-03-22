const months = require('./dateOrders').months
const daysOfTheWeek = require('./dateOrders').daysOfTheWeek

module.exports = function(p, excludedValue, dataType, datePart, a, b) {

  if (p) {
    // Array of objects sort by property

      if (a[p] === excludedValue) {
        return -1
      }
      if (b[p] === excludedValue) {
        return 1
      }
        
      if (dataType === 'date_time' && datePart) {

        // datePart === year works with regular sort
            
        if (datePart === 'month') {
          if (months.indexOf(a[p]) < months.indexOf(b[p])) {
            return -1
          }
          if (months.indexOf(a[p]) > months.indexOf(b[p])) {
            return  1
          }
            return 0
        }

        if (datePart === 'monthAndYear') {
          aL = a[p].length
          const aYear = parseInt(a[p].substring(aL - 4, aL))
          const aMonth = a[p].substring(0, aL - 5)
          bL = b[p].length
          const bYear = parseInt(b[p].substring(bL - 4, bL))
          const bMonth = b[p].substring(0, bL - 5)
          console.log(aYear, bYear, aMonth, bMonth)
          
          if (aYear < bYear) {
            return -1
          } else if (aYear > bYear) {
            return 1
          } else {
            if (months.indexOf(aMonth) < months.indexOf(bMonth)) {
              return -1
            }
            if (months.indexOf(aMonth) > months.indexOf(bMonth)) {
              return  1
            }
              return 0
          }
        }

        if (datePart === 'date' || datePart === 'minute') {
          const intA = parseInt(a[p]);
          const intB = parseInt(b[p])
          if (intA < intB) {
            return -1
          }
          if (intA > intB) {
            return  1
          }
            return 0
        }

        if (datePart === 'dayOfTheWeek') {
          if (daysOfTheWeek.indexOf(a[p]) < daysOfTheWeek.indexOf(b[p])) {
            return -1
          }
          if (daysOfTheWeek.indexOf(a[p]) > daysOfTheWeek.indexOf(b[p])) {
            return  1
          }
            return 0
        }

        if (datePart === 'hour') {
          const aSplit = a[p].split(' ')
          const bSplit = b[p].split(' ')
          const aHour = parseInt(aSplit[0])
          const aAmPm = aSplit[1]
          const bHour = parseInt(bSplit[0])
          const bAmPm = bSplit[1]

          
          if (a[p] === b[p]) {
            return 0
          }
          if (a[p] === '12 am') {
            return -1
          }
          if (b[p] === '12 am') {
            return 1
          }

          if (aAmPm === 'am') {
            if (bAmPm === 'am') {
              // Both in AM
              if (aHour < bHour) {
                return -1
              } else {
                return 1
              }
            } else {
              // A is am, B is pm
              return -1 
            }
          } else {
            if (bAmPm === 'am') {
              // A is pm, B is am
              return 1
            } else {
              // Both in PM
              if (aHour === 12) {
                return -1
              }
              if (bHour === 12) {
                return 1
              }
              if (aHour < bHour) {
                return -1
              } else {
                return 1
              }
            }
          }

        }
      }
        

      if (a[p] < b[p]) {
        return -1
      }
      if (a[p] > b[p]) {
        return 1
      }
      return 0
  } else {
    // Array of numbers

    if (a === excludedValue) {
      return -1
    }
    if (b === excludedValue) {
      return 1
    }

    if (a < b) {
      return -1
    }
    if (a > b) {
      return 1
    }
      return 0
  }
}