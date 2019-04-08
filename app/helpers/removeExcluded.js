module.exports = function removeExcluded(vectorsArray, config) {
  console.log("VA:", vectorsArray)

  // If excludedValue is included in vectors then remove it:
  var groupableVectorsArray = []
  var excludedArray = []
  for (i in vectorsArray) {
    const vectors = vectorsArray[i]
    if (vectors[0] && vectors[0].name === config.exclude) {
      groupableVectorsArray.push()
      excludedArray.push(vectors.slice(0, 1)[0].value)
    }
  }

  return {
    groupable: groupableVectorsArray,
    excluded: excludedArray
  }
}