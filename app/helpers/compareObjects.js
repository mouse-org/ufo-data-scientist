module.exports = function(p, excludedValue, a, b) {
    if (p) {
        // Array of objects sort by property

        if (a[p] === excludedValue) {
            return -1
        }
        if (b[p] === excludedValue) {
            return 1
        }


        if (a[p] < b[p]) {
            return -1
        }
        if (a[p] > b[p]) {
            return 1
        }
        return 0
    } else {
        // Array of numbers

        if (a === excludedValue) {
            return -1
        }
        if (b === excludedValue) {
            return 1
        }

        if (a < b) {
            return -1
        }
        if (a > b) {
            return 1
        }
        return 0
    }
}