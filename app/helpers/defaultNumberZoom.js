// This function is unecessarily complicated because maxNumberZoom
// is set to higher than 10. The default should either be 10 or the
// length of the data if less than 10.


module.exports = function defaultNumberZoom(dataLength, maxNumberZoom) {
  if (dataLength > 10) {
    return 10
  } else {
    if (dataLength > maxNumberZoom) {
      // This shouldn't happen with current settings
      return maxNumberZoom
    } else {
      if (dataLength < 3) {
        // This should be avoided (will maybe crash the app?)
        return 3
      } else {
        return dataLength
      }
    }  
  }
}