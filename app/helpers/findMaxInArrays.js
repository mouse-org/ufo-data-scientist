// Datasets array should be an array of arrays

module.exports = function findMaxInArrays(datasetsArray, property) {
  var max = undefined
  if (datasetsArray[0] != undefined) {
    if (datasetsArray[0][0] != undefined) {
      if (!property) {    
        max = datasetsArray[0][0]
      } else {
        max = datasetsArray[0][0][property]
      }

      for (var i in datasetsArray) {
        const ds = datasetsArray[i]
        for (var j in ds) {
          if (property) {
            if (typeof ds[j][property] != 'number') {
              return undefined
            }
            if (ds[j][property] > max) {
              max = ds[j][property]
            }
            console.log(i, j, "MAX:", max, ds[j][property])
          } else {
            if (typeof ds[j] != 'number') {
              return undefined
            }  
            if (ds[j] > max) {
              max = ds[j]
            }
          }
        }
      }
    }
  } 
  return max
}