const React = require('react')
const ReactDOM = require('react-dom')
const uuidv4 = require('uuid/v4')

const data = require('./newData')
const dataStructures = require('./helpers/dataStructure')
console.log("DS:", dataStructures)
//const data = require('./fullData');
//const data = require('./data');
//const defaultGroup = require('./helpers/defaultGroup');
//const breakApartData = require('./helpers/breakApartData');
const compareObjects = require('./helpers/compareObjects')

// Components:
//const Section = require('./components/Section');

//const sections = ["SeeAllData", "CleanData", "DataViz"];

const maxNumberZoom = 50;

const BarChart = require('./components/BarChart')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.groupData = this.groupData.bind(this)
    this.onDataPropertyChanged = this.onDataPropertyChanged.bind(this)
    this.onMinMaxRangeChanged = this.onMinMaxRangeChanged.bind(this)
    this.onNumberZoomChanged = this.onNumberZoomChanged.bind(this)
    this.state = {
      title: "UFO Data Scientist",
      data: data,
      dataPropertyIndex: 3,
      min: 0,
      max: 50,
      rangeMin: 0,
      rangeMax: 50,
      numberZoom: data.length > 10 ? 10 : data.length > maxNumberZoom ? maxNumberZoom : data.length,
      maxNumberZoom: maxNumberZoom,
      chartData: []
      //data: [25, 35, 50, 66, 87]
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

  /* Extracts a single data set from the full data
  also applies an optional transformationon to the data. */
  extractProperty(data, labelIndex, transformation = (i => i)) {
    const extractedData = data.map(d => d[labelIndex])
    return extractedData.map(transformation)
  }

  // Takes data with 1 property (created using extractProperty())
  vectorsFromSetAndValues(values, valuesSet, excludedValue) {
    // Create empty object for value vectors and labels
    var vectorObj = {}
    // Add property with value 0 for every unique value
    valuesSet.map(d => vectorObj[d] = 0)
    // For every data point increment value of corresponding
    // property in vector object
    values.map(d => vectorObj[d] += 1)

    // Transofrm vectorObj to an array
    var vectors = []
    for (var d in vectorObj) {
      var name = isNaN(parseFloat(d)) ? d : parseFloat(d)
      vectors.push({name: name, value: vectorObj[d]})
    }
    return vectors.sort(compareObjects.bind(this, 'name', excludedValue))
  }

  dataType() {
    return dataStructures[this.state.dataPropertyIndex].type
  }

  getMinMax(sortedData) {

  }

  getChartData() {
    
    // Get the data for the chosen property
    const propertyData = this.extractProperty(
      this.state.data,
      this.state.dataPropertyIndex
    )

    // Unique values from propertyData
    const excludedValue = dataStructures[this.state.dataPropertyIndex].exclude
    var propertySet = [...new Set(propertyData)]

    // Turn array of values into vectors with values and frequency
    const vectors = this.vectorsFromSetAndValues(
      propertyData, propertySet, excludedValue
    )

    // If excludedValue is included in vectors then remove it:
    var comparableVectors = vectors
    var excluded = null
    if (vectors[0].name === excludedValue) {
      comparableVectors = vectors.slice(1, vectors.length)
      excluded = vectors.slice(0, 1)[0].value
    }

    const min = comparableVectors[0].name
    const max = comparableVectors[comparableVectors.length - 1].name

    // Group data
    var chartData = this.groupData(
      comparableVectors, this.state.numberZoom
    );

    // Need to extract value above and add in 'Unknown'
    // here because of differente excluded values in data
    chartData.push({name: 'Unknown', value: excluded})

    this.setState({
      min: min,
      max: max,
      chartData: chartData
    })
  }

  groupData(sortedData, groups) {
    var newData = [];
    if (this.dataType() === 'number'){
      const min = Math.floor(sortedData[0].name);
      const max = Math.ceil(sortedData[sortedData.length - 1].name);
      var spacing = (max - min) / groups;

      // Make a new array with fewer datapoints
      for (var i = min; i <= max + spacing; i += spacing) {
        newData.push({name: i, value: 0})
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
    } else if (this.dataType() === 'datetime') {
      return sortedData
    } else {
      // String data points:
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

  onMinMaxRangeChanged(e) {
    this.setState({
      rangeMax: e.target.value
    })
  }
  onNumberZoomChanged(e) {
    var zoom = e.target.value;
    zoom = zoom > maxNumberZoom ? maxNumberZoom : zoom;
    this.setState({
      numberZoom: zoom
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

    

    return (
      <div id="app">
        <h1>{this.state.title}</h1>
        <p>Min: {this.state.rangeMin}</p>
        <p>Max: {this.state.rangeMax}</p>
        <p>Number Zoom: {this.state.numberZoom}</p>
        
        {/*
        <div id="sliders">
          <label>1</label>
          <input type="range" min="1" max="100" value={this.state.data[0]} className="slider" id="slider-1" onChange={this.handleChange}></input>
          <label>2</label>
          <input type="range" min="1" max="100" value={this.state.data[1]} className="slider" id="slider-2" onChange={this.handleChange}></input>
          <label>3</label>
          <input type="range" min="1" max="100" value={this.state.data[2]} className="slider" id="slider-3" onChange={this.handleChange}></input>
          <label>4</label>
          <input type="range" min="1" max="100" value={this.state.data[3]} className="slider" id="slider-4" onChange={this.handleChange}></input>
          <label>5</label>
          <input type="range" min="1" max="100" value={this.state.data[4]} className="slider" id="slider-5" onChange={this.handleChange}></input>
        
        </div>
        */}
        <label>Min Max:</label>
        <div id="min-max-sliders">
          <input
            type="range"
            min={this.state.min}
            max={this.state.max}
            value={this.state.rangeMax}
            onChange={this.onMinMaxRangeChanged}
            className="slider"
            id="min-max"
          />
        </div>
        <label>Number Zoom:</label>
        <div id="number-zoom-slider">
          <input
            type="range"
            min="2"
            max={this.state.data.length > maxNumberZoom ? maxNumberZoom : this.state.data.length}
            value={this.state.numberZoom}
            onChange={this.onNumberZoomChanged}
            className="slider"
            id="number-zoom"
          />
        </div>
        <ul>
          {selectDataProperty}
        </ul>

        <h3>Data:</h3>

        <BarChart
          data={this.state.chartData}
          number={this.isNumber}
          x={this.extractProperty(data, 'shape')}
          y={this.extractProperty(data, 'duration_minutes')}
        />
      </div>
    )
  }

}


ReactDOM.render(<App/>, document.getElementById('main'));
