// Takes data with 1 property (created using getDataForSelectedProperty())

const compareObjects = require('./compareObjects')

module.exports = function vectorsFromSetAndValues(values, valuesSet, excludedValue, dataType, datePartName) {

  // Create empty object for value vectors and labels
  var vectorObj = {}
  // Add property with value 0 for every unique value
  valuesSet.map(d => vectorObj[d] = 0)

  //console.log("VO1:", vectorObj)

  // For every data point increment value of corresponding
  // property in vector object
  values.map(d => vectorObj[d] += 1)

  //console.log("VO2:", vectorObj)

  // Transofrm vectorObj to an array
  var vectors = []
  for (var d in vectorObj) {
    var value = vectorObj[d]
    // If label (name) is a number parse it
    var name;

    if (dataType === 'number') {
      name = d === excludedValue ? excludedValue : parseFloat(d)
    //} else if (dataType === 'datetime') {
      // This is a string, maybe it should get datafied here?
      // 🚸 If we do more sophisticated dates maybe we need to do this
      //name = d;
     // vectors.push({name: name, value: value})
    } else { // dataType === 'string' (or 'datetime')
      name = d; 
    }  
    vectors.push({name: name, value: value})    
  }
  
  return vectors.sort(compareObjects.bind(this, 'name', excludedValue, dataType, datePartName))
}