const compare = require('./compareObjects')

// (p, excludedValue, dataType, datePart, a, b)

test ('5 to be equal to 5', () => {
  expect(compare(false, false, false, false, 5, 5)).toBe(0)
})

test('1 to be less than 2', () => {
  expect(compare(false, false, false, false, 1, 2)).toBe(-1)
})

test('3 to be more than 2', () => {
  expect(compare(false, false, false, false, 3, 2)).toBe(1)
})

test('excluded value as a to be excluded', () => {
  expect(compare(false, 3, false, false, 3, 2)).toBe(-1)
})

test('excluded value as b to be excluded', () => {
  expect(compare(false, 2, false, false, 1, 2)).toBe(1)
})


/* Objects */

test('Object with .name 5 is equal to Object with .name 5', () => {
  expect(compare('name', false, false, false, {name: 5}, {name: 5})).toBe(0)
})

test('Object with .name 5 is greater than Object with .name 4', () => {
  expect(compare('name', false, false, false, {name: 5}, {name: 4})).toBe(1)
})

test('Object with .name 4 is less than Object with .name 5', () => {
  expect(compare('name', false, false, false, {name: 4}, {name: 5})).toBe(-1)
})

test('Object with .name "unknown" is less than Object with .name 4', () => {
  expect(compare('name', 'unknown', false, false, {name: 'unknown'}, {name: 4})).toBe(-1)
})

test('Object with .name 5 is less than Object with .name "unknown"', () => {
  expect(compare('name', 'unknown', false, false, {name: 5}, {name: 'unknown'})).toBe(1)
})

test('Object with .name "unknown" is less than Object with .name "unknown"', () => {
  expect(compare('name', 'unknown', false, false, {name: 'unknown'}, {name: 'unknown'})).toBe(0)
})

test('January to be less than April', () => {
  expect(compare('name', 'unknown', 'date_time', 'month', {name: 'January'}, {name: 'April'})).toBe(-1)
})

test('January to be less than March', () => {
  expect(compare('name', 'unknown', 'date_time', 'month', {name: 'January'}, {name: 'March'})).toBe(-1)
})

test('April to be less than October', () => {
  expect(compare('name', 'unknown', 'date_time', 'month', {name: 'April'}, {name: 'October'})).toBe(-1)
})

test('October to be greater than April', () => {
  expect(compare('name', 'unknown', 'date_time', 'month', {name: 'October'}, {name: 'April'})).toBe(1)
})

test('October to be less than December', () => {
  expect(compare('name', 'unknown', 'date_time', 'month', {name: 'October'}, {name: 'December'})).toBe(-1)
})

test('December to be greater than October', () => {
  expect(compare('name', 'unknown', 'date_time', 'month', {name: 'December'}, {name: 'October'})).toBe(1)
})

test('"December 2019" to be greater than "October 2019"', () => {
  expect(
    compare('name', 'unknown', 'date_time', 'monthAndYear', {name: 'December 2019'}, {name: 'October 2019'})
  ).toBe(1)
})

test('"December 2018" to be less than "October 2019"', () => {
  expect(
    compare('name', 'unknown', 'date_time', 'monthAndYear', {name: 'December 2018'}, {name: 'October 2019'})
  ).toBe(-1)
})

test('"April 2018" to be less than "October 2019"', () => {
  expect(
    compare('name', 'unknown', 'date_time', 'monthAndYear', {name: 'April 2018'}, {name: 'October 2019'})
  ).toBe(-1)
})

test('"April 2018" to be less than "October 2018"', () => {
  expect(
    compare('name', 'unknown', 'date_time', 'monthAndYear', {name: 'April 2018'}, {name: 'October 2018'})
  ).toBe(-1)
})

test('"April 2018" to be greater than "March 2018"', () => {
  expect(
    compare('name', 'unknown', 'date_time', 'monthAndYear', {name: 'April 2018'}, {name: 'March 2018'})
  ).toBe(1)
})

test('"March 2018" to be less than "May 2018"', () => {
  expect(
    compare('name', 'unknown', 'date_time', 'monthAndYear', {name: 'March 2018'}, {name: 'May 2018'})
  ).toBe(-1)
})

test('"June 2018" to be greater than "May 2018"', () => {
  expect(
    compare('name', 'unknown', 'date_time', 'monthAndYear', {name: 'June 2018'}, {name: 'May 2018'})
  ).toBe(1)
})

test('"June 2018" to be less than "August 2018"', () => {
  expect(
    compare('name', 'unknown', 'date_time', 'monthAndYear', {name: 'June 2018'}, {name: 'August 2018'})
  ).toBe(-1)
})

test('"2" to be less than "10"', () => {
  expect(
    compare('name', 'unknown', 'date_time', 'date', {name: '2'}, {name: '10'})
  ).toBe(-1)
})

test('"02" to be less than "10"', () => {
  expect(
    compare('name', 'unknown', 'date_time', 'minute', {name: '02'}, {name: '10'})
  ).toBe(-1)
})

test('"Tuesday" to be less than "Friday"', () => {
  expect(
    compare('name', 'unknown', 'date_time', 'dayOfTheWeek', {name: 'Tuesday'}, {name: 'Friday'})
  ).toBe(-1)
})

test('"Sunday" to be less than "Thursday"', () => {
  expect(
    compare('name', 'unknown', 'date_time', 'dayOfTheWeek', {name: 'Sunday'}, {name: 'Thursday'})
  ).toBe(-1)
})

test('"Friday" to be greater than "Monday"', () => {
  expect(
    compare('name', 'unknown', 'date_time', 'dayOfTheWeek', {name: 'Friday'}, {name: 'Monday'})
  ).toBe(1)
})

test('"3 am" to be less than "1 pm"', () => {
  expect(
    compare('name', 'unknown', 'date_time', 'hour', {name: '3 am'}, {name: '1 pm'})
  ).toBe(-1)
})

test('"1 pm" to be greater than "5 am"', () => {
  expect(
    compare('name', 'unknown', 'date_time', 'hour', {name: '1 pm'}, {name: '5 am'})
  ).toBe(1)
})

test('"12 am" to be less than "5 am"', () => {
  expect(
    compare('name', 'unknown', 'date_time', 'hour', {name: '12 am'}, {name: '5 am'})
  ).toBe(-1)
})

test('"2 am" to be less than "12 pm"', () => {
  expect(
    compare('name', 'unknown', 'date_time', 'hour', {name: '2 am'}, {name: '12 pm'})
  ).toBe(-1)
})

test('"12 am" to be less than "11 am"', () => {
  expect(
    compare('name', 'unknown', 'date_time', 'hour', {name: '12 am'}, {name: '11 am'})
  ).toBe(-1)
})

test('"12 pm" to be less than "1 pm"', () => {
  expect(
    compare('name', 'unknown', 'date_time', 'hour', {name: '12 pm'}, {name: '1 pm'})
  ).toBe(-1)
})

test('"12 pm" to be greater than "11 am"', () => {
  expect(
    compare('name', 'unknown', 'date_time', 'hour', {name: '12 pm'}, {name: '11 am'})
  ).toBe(1)
})
