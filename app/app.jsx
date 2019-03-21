const React = require('react')
const ReactDOM = require('react-dom')
//const uuidv4 = require('uuid/v4')

const data = require('./newData')
const dataStructures = require('./helpers/dataStructure')
const compareObjects = require('./helpers/compareObjects')

const maxNumberZoom = 50;

/* Components */
const BarChart = require('./components/BarChart')
const NumberDataSetControls = require('./components/NumberDataSetControls')
const DateTimeDataSetControls = require('./components/DateTimeDataSetControls')
const datePartOptions = require('./helpers/datePartOptions')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.groupData = this.groupData.bind(this)
    this.extractProperty = this.extractProperty.bind(this)
    this.onDataPropertyChanged = this.onDataPropertyChanged.bind(this)
    this.onRangeMaxChanged = this.onRangeMaxChanged.bind(this)
    this.onRangeMinChanged = this.onRangeMinChanged.bind(this)
    this.onNumberZoomChanged = this.onNumberZoomChanged.bind(this)
    this.onDatePartChanged = this.onDatePartChanged.bind(this)
    this.state = {
      title: "UFO Data Scientist",
      data: data,
      dataPropertyIndex: 5,
      min: 0,
      max: 50,
      rangeMin: 0,
      rangeMax: 50,
      numberZoom: data.length > 10 ? 10 : data.length > maxNumberZoom ? maxNumberZoom : data.length,
      maxNumberZoom: maxNumberZoom,
      datePart: datePartOptions[0],
      chartData: []
    }
  }
  handleChange(event) {
    let index = (parseInt(event.target.id.substring(7, 8)))
    const oldData = this.state.data;
    var newData = oldData;
    newData[index - 1] = event.target.value;
    this.setState({data: newData});
  }

  componentDidMount() {
    this.getChartData()
  }

  componentWillUnmount() {
  }

  

  dataType() {
    return dataStructures[this.state.dataPropertyIndex].type
  }

  getChartData() {

    var transformation = i => i
    if (this.dataType() === 'datetime') {    
      transformation = i => {
        const subtransform = this.state.datePart.transformation
        var datePart = new Date(i)
        if (this.state.datePart.method) {
          datePart = datePart[this.state.datePart.method]()
        }
        const datePartString = subtransform(datePart).toString()
        return datePartString
      }
    }

    // Get the data for the chosen property
    const propertyData = this.extractProperty(
      this.state.data,
      this.state.dataPropertyIndex,
      transformation
    )

    // Unique values from propertyData
    const excludedValue = dataStructures[this.state.dataPropertyIndex].exclude
    var propertySet = [...new Set(propertyData)]

    //console.log("PS:", propertySet)

    // Turn array of values into vectors with values and frequency
    const vectors = this.vectorsFromSetAndValues(
      propertyData, propertySet, excludedValue, this.dataType()
    )

    //console.log("V:", vectors)

    // If excludedValue is included in vectors then remove it:
    var comparableVectors = vectors
    var excluded = null
    
    if (vectors[0] && vectors[0].name === excludedValue) {
      comparableVectors = vectors.slice(1, vectors.length)
      excluded = vectors.slice(0, 1)[0].value
    }

    if (comparableVectors[0]){
      const min = comparableVectors[0].name
      const max = comparableVectors[comparableVectors.length - 1].name
    } else {

    }

    // Group data
    /*
    var transformation = i => i
    if (this.dataType() === 'datetime') {      
      transformation = i => new Date(i).getFullYear().toString()
    }
    */
    var chartData = this.groupData(
      comparableVectors, this.dataType(), this.state.numberZoom
    );

    // Need to extract value above and add in 'Unknown'
    // here because of differente excluded values in data
    if (excluded) {
      chartData.push({name: 'Unknown', value: excluded})
    }

    this.setState({
      chartData: chartData
    })
  }

  /* Extracts a single data set from the full data
  also applies an optional transformationon to the data. */
  extractProperty(data, labelIndex, transformation = (i => i)) {
    var extractedData = data.map(d => d[labelIndex])
    var extractedData2 = extractedData.map(transformation)
    var min = false
    var max = false
    extractedData2.map((d, i) => {
      if (min === false || d < min) {
        min = d;
      }
      if (max === false || d > max) {
        max = d;
      }
    })
    this.setState({
      min: min,
      max: max,
    })
    return extractedData2
  }

  // Takes data with 1 property (created using extractProperty())
  vectorsFromSetAndValues(values, valuesSet, excludedValue, dataType) {
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
      // If label (name) is a number use min/max sliders:
      var name;

      if (dataType === 'number') {
        name = parseFloat(d)
        if (name <= this.state.rangeMax && name >= this.state.rangeMin) {
          vectors.push({name: name, value: value})
        } else {
          // 
        }
      } /*else if (dataType === 'datetime') {
        // This is a string, maybe it should get datafied here?
        name = d;
        vectors.push({name: name, value: value})
      } */else { // dataType === 'string'
        name = d;
        vectors.push({name: name, value: value})
      }      
    }
    return vectors.sort(compareObjects.bind(this, 'name', excludedValue, this.state.dataPropertyIndex, this.state.datePart['name']))
  }

  groupData(sortedData, dataType, groups) {
    //console.log("SD:", sortedData)
    var newData = [];
    if (dataType === 'number'){
      // Number Data Sets: duration_minutes, city_latitude, city_longitude
      var min, max
      if (sortedData[0]) {
        min = Math.floor(sortedData[0].name)
        max = Math.ceil(sortedData[sortedData.length - 1].name)
      } else {
        // 🚸 Placeholder?
        min = this.state.rangeMin
        max = this.state.rangeMax
      }

      var spacing = (max - min) / groups;

      // Make a new array with fewer datapoints
      for (var i = min; i <= max + spacing; i += spacing) {
        console.log("i:", i, typeof i)
        var name = isNaN(i) ? 0 : i.toFixed(2)
        newData.push({name: name, value: 0})
      }
      for (var i = 0, j = 0; i < sortedData.length; i++) {
        if (sortedData[i].name > newData[j].name) {
          j++
          i--
          continue
        }
        newData[j].value += sortedData[i].value
      }
      return newData
    } /*else if (dataType === 'datetime') {
      // Date/Time Data Sets: date_time)
      return this.groupData(sortedData, 'string', groups)

    } */else {
      // String Data Sets: state, shape

      // No transformations as groups are already created
      return sortedData
    }
    // Spacing grouping
    // Exclude
  }

  onDataPropertyChanged(e) {
    this.setState({
      dataPropertyIndex: e.currentTarget.value
    }, this.getChartData)
  }

  onRangeMaxChanged(e) {
    this.setState({
      rangeMax: parseFloat(e.target.value)
    }, this.getChartData)
  }

  onRangeMinChanged(e) {
    this.setState({
      rangeMin: parseFloat(e.target.value)
    }, this.getChartData)
  }
  onNumberZoomChanged(e) {
    var zoom = e.target.value;
    zoom = zoom > maxNumberZoom ? maxNumberZoom : zoom;
    this.setState({
      numberZoom: zoom
    }, this.getChartData)
  }

  onDatePartChanged(e) {
    const index = e.currentTarget.value
    this.setState({
      datePart: datePartOptions[index]
    }, this.getChartData)
  }

  render() {
    const selectDataProperty = dataStructures.map((ds, index) => 
      <li key={ds.name}>
        <span><input
          type="radio"
          name="data"
          value={index}
          onChange={this.onDataPropertyChanged}
          checked={parseInt(this.state.dataPropertyIndex) === index}
          /> {ds.name}</span><br/>
      </li>
    )

    var controls = []
    if (this.dataType() === 'number') {
      controls.push(<NumberDataSetControls
        label={dataStructures[this.state.dataPropertyIndex].name}
        key={dataStructures[this.state.dataPropertyIndex].name}
        rangeMin={this.state.rangeMin}
        rangeMax={this.state.rangeMax}
        min={this.state.min}
        max={this.state.max}
        onRangeMaxChanged={this.onRangeMaxChanged}
        onRangeMinChanged={this.onRangeMinChanged}
        data={this.state.data}
        numberZoom={this.state.numberZoom}
        maxNumberZoom={maxNumberZoom}
        onNumberZoomChanged={this.onNumberZoomChanged}
      />)
    } else if (this.dataType() === 'datetime') {
      controls.push(<DateTimeDataSetControls
        label={dataStructures[this.state.dataPropertyIndex].name}
        key={dataStructures[this.state.dataPropertyIndex].name}
        datePart={this.state.datePart.name}
        onDatePartChanged={this.onDatePartChanged}
      />)
    }

    return (
      <div id="app">
        <h1>{this.state.title}</h1>
        <p>Dataset Min: {this.state.min}</p>
        <p>Dataset Max: {this.state.max}</p>

        <ul>
          {selectDataProperty}
        </ul>

        <div id="controls">
          {controls}
        </div>

        <h3>Data:</h3>

        <BarChart
          data={this.state.chartData}
          number={this.isNumber}
        />
      </div>
    )
  }

}


ReactDOM.render(<App/>, document.getElementById('main'));
