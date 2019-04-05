const vectorsFromData = require('./vectorsFromData')
const compareObjects = require('./compareObjects')
const groupData = require('./groupData')
 
module.exports = function vectorGroupsFromExtracted(extracted, numberOfGroups, options) {
  // Takes single property array and returns groups of data as vectors

  /*
  options:
    dataType
    exclude
    datePartName
    min
    max
  */

  // Round number datatypes:
  if (options.dataType === 'number') {
    extracted = extracted.map(i => {
      if (i === options.exclude) {
        return i
      } else {
        return Math.round(i * 1000) / 1000
      }
    })
  }


  // Get vector array of names, values
  var vectors = vectorsFromData(extracted)

  // Sort vectors
  vectors.sort(compareObjects.bind(
    this,
    'name',
    options.exclude,
    options.dataType,
    options.datePartName
  ))

  // Remove excluded value:
  var excluded
  if (vectors[0] && vectors[0].name === options.exclude) {
    excluded = vectors[0]
    vectors = vectors.slice(1, vectors.length)
  }

  var absMin = false
  var absMax = false
  if (options.dataType != 'number') {
    var groupedVectors = vectors
  } else {

    absMin = Math.floor(vectors[0].name)
    absMax = Math.ceil(vectors[vectors.length - 1].name)
    var min = options.min === false ? absMin : options.min
    var max =  options.max === false ? absMax : options.max

    var groupedVectors = groupData(
      vectors, numberOfGroups, min, max
    )
  }

  if (excluded) {
    groupedVectors.push(excluded)
  }

  return {
    groupedVectors: groupedVectors,
    absMin: absMin,
    absMax: absMax
  }
}