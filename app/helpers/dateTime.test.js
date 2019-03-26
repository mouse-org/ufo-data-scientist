const { rounding, monthNameFromNumber } = require('./dateTime')

test('1-1-2019 in YYYY mode is 2019', () => {
    const dateString = new Date('1-1-2019').toISOString()
    expect(rounding('YYYY', dateString)).toBe('2019')
})

test('Nov 10 2017 in YYYY mode is 2017', () => {
    const dateString = new Date('Nov 10 2017').toISOString()
    expect(rounding('YYYY', dateString)).toBe('2017')
})

test('2016-10-04T22:35:00 in YYYY mode is 2016', () => {
    const dateString = new Date('2016-10-04T22:35:00').toISOString()
    expect(rounding('YYYY', dateString)).toBe('2016')
})

test('2016-04-04T01:49:00 in YYYY-MM mode is 2016', () => {
    const dateString = '2016-04-04T01:49:00'
    expect(rounding('YYYY-MM', dateString)).toBe('2016-04')
})

test('2015-07-03T21:45:00 in Month Name mode is July', () => {
    const dateString = '2015-07-03T21:45:00'
    expect(rounding('Month Name', dateString)).toBe('July')
})

test ('2015-03-22T22:00:00 in Month Name mode is March', () => {
    const dateString = '2015-03-22T22:00:00'
    expect(rounding('Month Name', dateString)).toBe('March')
})

test ('8 is August', () => {
    expect(monthNameFromNumber(8)).toBe('August')
})

test ('"02" is February', () => {
    expect(monthNameFromNumber('02')).toBe('February')
})
