const dateTimeRounding = (scope, dateTime) => {
  switch (scope) {
    case "YYYY":
      return dateTime.substring(0, 4);
    case "YYYY-MM":
      return dateTime.substring(0, 7);
    case "MM":
      return monthNameFromNumber(dateTime.substring(5, 7));
    default:
      return dateTime;
  }
}

const monthNameFromNumber = (monthNumberAsString) => {
  let monthName;
  switch (monthNumberAsString) {
    case '01':
      monthName = 'January';
      break;
    case '02':
      monthName = 'February';
      break;
    case '03':
      monthName = 'March';
      break;
    case '04':
      monthName = 'April';
      break;
    case '05':
      monthName = 'May';
      break;
    case '06':
      monthName = 'June';
      break;
    case '07':
      monthName = 'July';
      break;
    case '08':
      monthName = 'August';
      break;
    case '09':
      monthName = 'September';
      break;
    case '10':
      monthName = 'October';
      break;
    case '11':
      monthName = 'November';
      break;
    case '12':
      monthName = 'December';
      break;
    default:
      monthName = 'Unknown';
      break;
  }
  return monthName
}

module.exports = {
  rounding: dateTimeRounding
}

