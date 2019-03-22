 /* Extracts a single data set from the full data
  also applies an optional transformationon to the data. */
  
  module.exports = function extractDataForSelectedProperty(data, dataPropertyIndex, dataType, datePart) {
    // Default identity transformation
    var transformation = i => i
    // Datetime only transformation
    if (dataType === 'datetime') {    
      transformation = i => {
        const subtransform = datePart.transformation
        const itemDate = new Date(i)
        if (datePart.method) {
          var itemDatePart = itemDate[datePart.method]()
        }
        return subtransform(itemDatePart).toString()
      }
    }
    return data.map(d => d[dataPropertyIndex]).map(transformation)
  }