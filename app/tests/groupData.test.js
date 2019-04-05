const groupData = require('../helpers/groupData')
// Arguments: (sortedData, groups, rangeMin, rangeMax)


const d1 = [
  {name: 1, value: 5},
  {name: 2, value: 3},
  {name: 3, value: 2}
]

test('grouped data length should equal number of groups', () => {
  const numberOfGroups = 3
  const g = groupData(d1, numberOfGroups, 1, 3)
  expect(g.length).toEqual(numberOfGroups)
})

const d2 = [
  {name: 1, value: 4},
  {name: 5, value: 5},
  {name: 10, value: 100},
  {name: 9, value: 28},
  {name: 14, value: 2},
  {name: 16, value: 2},
  {name: 21, value: 7}
]

test('first item in grouped data should have min passed in', () => {
  const min = 0
  const g = groupData(d2, 3, min, 30)
  const roundedMin = Math.floor(min)
  expect(g[0].min).toBeCloseTo(roundedMin)
})

test('last item in grouped data should have max passed in', () => {
  const max = 30
  const g = groupData(d2, 3, 0, max)
  const roundedMax = Math.ceil(max)
  expect(g[g.length - 1].max).toBeCloseTo(roundedMax)
})