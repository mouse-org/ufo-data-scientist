// Takes 2 sets of data with 1 property each (created using getDataForSelectedProperty())

function vectorObjtoVectorArray(vectorObj, dataType) {
  var vectors = []
  for (var d in vectorObj) {
    const value = vectorObj[d]
    var name = d
    if (dataType === 'number' && !isNaN(name)) {
      name = parseFloat(name)
    }
    vectors.push({name: name, value: value})    
  }

  return vectors
}

module.exports = function vectorsFromData(data, dataType) {
  
  // unique values only
  const set = [...new Set(data)]

  // Create empty object for value vectors and labels
  var vectorObj = {}

  // Add property with value 0 for every unique value
  set.map(d => vectorObj[d] = 0)
  
  // For every data point increment value of corresponding
  // property in vector object
  data.map(d => vectorObj[d] += 1)

  // Transofrm vectorObj to an array
  return vectorObjtoVectorArray(vectorObj, dataType)
}