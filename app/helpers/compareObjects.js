module.exports = function(p, excludedValue, a, b) {
    if (p) {
        // Array of objects sort by property
        if (a[p] < b[p] || a[p] === excludedValue) {
            return -1
        }
        if (a[p] > b[p] || b[p] === excludedValue) {
            return 1
        }
        return 0
    } else {
        // Array of numbers
        if (a < b || a === excludedValue) {
            return -1
        }
        if (a > b || b === excludedValue) {
            return 1
        }
        return 0
    }
}