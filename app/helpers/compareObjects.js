module.exports = function(p, a, b) {
    if (a[p] < b[p]) {
        return -1
    }
    if (a[p] > b[p]) {
        return 1
    }
    return 0
}