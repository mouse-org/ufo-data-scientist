// Takes 2 sets of data with 1 property each (created using getDataForSelectedProperty())

const compareObjects = require('./compareObjects')

function vectorObjtoVectorArray(vectors, vectorObj, primary, sec) {
  for (var d in vectorObj) {
    var value = vectorObj[d]
    console.log(sec != false, "$$ VALUE:", value)
    // If label (name) is a number parse it
    var name;

    if (primary.dataType === 'number') {
      name = d === primary.exclude ? primary.exclude : parseFloat(d)
    //} else if (primary.dataType === 'datetime') {
      // This is a string, maybe it should get datafied here?
      // 🚸 If we do more sophisticated dates maybe we need to do this
      //name = d;
    // vectors.push({name: name, value: value})
    } else { // primary.dataType === 'string' (or 'datetime')
      name = d; 
    }  
    vectors.push({name: name, value: value})    
  }
  return vectors
}

module.exports = function vectorsFromSetAndValues(primary, secondary) {
  console.log("VFSAV:")
  console.log("PRIMARY:", primary)
  console.log("SECONDARY:", secondary)

  var vectorsArray = []

  if (secondary) {
    // Create empty objects for value vectors and labels
    var sets = secondary.groups ? secondary.groups : secondary.set
    for (var i in sets) {
      var vectorObj = {}
      var set = sets[i]
      primary.set.map(d => vectorObj[d] = 0)

      // For every data point increment value of corresponding
      // property in vector object
      for (var i = 0; i < primary.data.length; i++) {
        var sd = secondary.data[i]
        const index = primary.data[i]
        // Is a number
        if (secondary.datatype === 'number') {
          if (sd <= set.max && sd >= set.min) {
            vectorObj[index] += 1
          }
        } else {
          if (sd === set) {
            vectorObj[index] += 1
          }
        }
        
      }

      // Transofrm vectorObj to an array
      var vectors = vectorObjtoVectorArray([], vectorObj, primary, secondary)

      vectorsArray.push(vectors)
    }

  } else {
    // Create empty object for value vectors and labels
    var vectorObj = {}
    // Add property with value 0 for every unique value
    primary.set.map(d => vectorObj[d] = 0)

    //console.log("VO1:", vectorObj)

    // For every data point increment value of corresponding
    // property in vector object
    primary.data.map(d => vectorObj[d] += 1)

    //console.log("VO2:", vectorObj)

    // Transofrm vectorObj to an array
    var vectors = vectorObjtoVectorArray([], vectorObj, primary)
    vectorsArray.push(vectors)
  }

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

  console.log("SORTED VECTORS:", sortedVectors)

  return sortedVectors
}