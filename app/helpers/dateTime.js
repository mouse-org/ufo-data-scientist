const dateTimeRounding = (scope, dateTime) => {
  switch (scope) {
    case "YYYY":
      return dateTime.substring(0, 4);
    case "YYYY-MM":
      return dateTime.substring(0, 7);
    case "Month Name":
      return monthNameFromNumber(dateTime.substring(5, 7));
    default:
      return dateTime;
  }
}

const monthNameFromNumber = (monthNumber) => {
  let monthName;
  switch (monthNumber) {
    case 1:
    case '1':
    case '01':
      monthName = 'January';
      break;
    case 2:
    case '2':
    case '02':
      monthName = 'February';
      break;
    case 3:
    case '3':
    case '03':
      monthName = 'March';
      break;
    case 4:
    case '4':
    case '04':
      monthName = 'April';
      break;
    case 5:
    case '5':
    case '05':
      monthName = 'May';
      break;
    case 6:
    case '6':
    case '06':
      monthName = 'June';
      break;
    case 7:
    case '7':
    case '07':
      monthName = 'July';
      break;
    case 8:
    case '8':
    case '08':
      monthName = 'August';
      break;
    case 9:
    case '9':
    case '09':
      monthName = 'September';
      break;
    case 10:
    case '10':
      monthName = 'October';
      break;
    case 11:
    case '11':
      monthName = 'November';
      break;
    case 12:
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
  rounding: dateTimeRounding,
  monthNameFromNumber: monthNameFromNumber
}

