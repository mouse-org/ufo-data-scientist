const defaultNumberZoom = require('../helpers/defaultNumberZoom')

test(`
  Default should be 10 when length is 10,000 and
  maxNumberZoom is 50.
  `, () => {
  expect(defaultNumberZoom(10000, 50)).toBe(10)
})

test(`
  Default should be 6 when length is 6 and
  maxNumberZoom is 50.
  `, () => {
  expect(defaultNumberZoom(6, 50)).toBe(6)
})

test(`
  Default should be 6 when length is 8 and
  maxNumberZoom is 6.
  `, () => {
  expect(defaultNumberZoom(8, 6)).toBe(6)
})

test(`
  Default should be 3 when length is 2 and
  maxNumberZoom is 6.
  `, () => {
  expect(defaultNumberZoom(2, 6)).toBe(3)
})

