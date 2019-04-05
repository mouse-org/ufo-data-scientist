const vectorsFromData = require('./vectorsFromData')

module.exports = function vectorGroupsFromExtracted(extracted, dataType, numberOfGroups) {
  // Takes single property array and returns groups of data as vectors

  // Get vector array of names, values
  var vectors = vectorsFromData(extracted)

  // If in vector item name is a number parse it
  if (dataType === 'number') {
    vectors = vectors.map(i => {
      i.name = parseInt(i.name)
      return i
    })
  }

  // Sort vectors
  var sortedVectors = []
  for (var i in vectorsArray) {
    const vectors = vectorsArray[i]
    vectors.sort(compareObjects.bind(
      this,
      'name',
      primary.exclude,
      primary.dataType,
      primary.datePart.name
    ))
    sortedVectors.push(vectors)
  }


}