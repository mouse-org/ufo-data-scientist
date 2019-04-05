const vfd = require('../helpers/vectorsFromData')

const d1 = [1,1,1,1,1,1,1,1,1,1,1,1]
const d2 = [1,1,2,3,3,3,3,4,4]

test(`
  Array of same value to be of length 1
`, () => {
    const vectors = vfd(d1)
    expect(vectors.length).toBe(1)
})

test(`
  Array of all 1s to have property 1 have value to be length of data
`, () => {
    const vectors = vfd(d1)
    expect(vectors[0].value).toBe(d1.length)
})

test(`
  vectors to have property with value 2 when 1 appears 2 times in data 
`, () => {
    const vectors = vfd(d2)
    expect(vectors).toContainEqual({name: '1', value: 2})
})

test(`
  vectors to have property with value 2 when 3 appears 4 times in data 
`, () => {
    const vectors = vfd(d2)
    expect(vectors).toContainEqual({name: '3', value: 4})
})