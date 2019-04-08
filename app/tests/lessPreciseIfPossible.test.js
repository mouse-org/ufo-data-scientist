const lessPreciseIfPossible = require('../helpers/lessPreciseIfPossible')

const differentToTwoDecimalPlaces = [
  {name: 1.53}, {name: 1.54}
]
test ('Different to two decimal places should not round', () => {
  expect(lessPreciseIfPossible(differentToTwoDecimalPlaces)).toEqual(
    [{name: 1.53}, {name: 1.54}]
  )
})

const differentToOneDecimalPlace = [
  {name: 1.34}, {name: 1.44}
]
test ('Different to one decimal place should round to one place', () => {
  expect(lessPreciseIfPossible(differentToOneDecimalPlace)).toEqual(
    [{name: 1.3}, {name: 1.4}]
  )
})

const differentToZeroDecimalPlaces = [
  {name: 1.54}, {name: 2.57}
]
test ('Different to zero decimal places should round to ints', () => {
  expect(lessPreciseIfPossible(differentToZeroDecimalPlaces)).toEqual(
    [{name: 2}, {name: 3}]
  )
})

const roundedSameToOnlyOneDecimalPlace = [
  {name: 1.89}, {name: 2.01}
]
test (
  'Different to zero decimal places but round' + 
  'to same should round to one decimal place', () => {
  expect(lessPreciseIfPossible(roundedSameToOnlyOneDecimalPlace)).toEqual(
    [{name: 1.9}, {name: 2.0}]
  )
})