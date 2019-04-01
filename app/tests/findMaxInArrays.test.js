const findMaxInArrays = require('../helpers/findMaxInArrays')

test('Empty Array and no property should return 0', () => {
    expect(findMaxInArrays([], false)).toBe(undefined)
})

test('[[1,2], [3,4]] and false should return 4', () => {
    expect(findMaxInArrays([[1,2], [3,4]], false)).toBe(4)
})

test('[[-1,-2], [-3,-4]] and false should return -1', () => {
    expect(findMaxInArrays([[-1,-2], [-3,-4]], false)).toBe(-1)
})

test('[[{value: 1, value: 2}], [{value: 3, value: 4}]] and false should return undefined', () => {
    expect(findMaxInArrays([[{value: 1}, {value: 2}], [{value: 3}, {value: 4}]], false)).toBe(undefined)
})

test('[[{value: 1, value: 2}], [{value: 3, value: 4}]] and "value" should return 4', () => {
    expect(findMaxInArrays([[{value: 1}, {value: 2}], [{value: 3}, {value: 4}]], 'value')).toBe(4)
})

test('[[{value: 0, value: -22}], [{value: -23, value: -24}]] and "value" should return 0', () => {
    expect(findMaxInArrays([[{value: 0}, {value: -22}], [{value: -23}, {value: -24}]], 'value')).toBe(0)
})

