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

const BarChart = require('./components/BarChart')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.groupData = this.groupData.bind(this)
    this.onDataPropertyChanged = this.onDataPropertyChanged.bind(this)
    this.state = {
      title: "UFO Data Scientist",
      data: data,
      dataPropertyIndex: 3,
      min: null,
      max: null
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

  // 🚸 'name is hard coded
  groupData(sortedData, spacing) {
    var newData = [];
    if (this.dataType() === 'number'){
      // Number data points:
      // Consolidate into vectors and values
      var min = Math.floor(sortedData[0].name);
      // Change to last item because 'unknowns' and '' should be removed.
      var max = Math.ceil(sortedData[sortedData.length - 1].name);
      console.log("MAX:", sortedData[sortedData.length - 1], Math.ceil(sortedData[sortedData.length - 1].name))
      console.log("min:", sortedData[0], Math.floor(sortedData[0].name))
      /*
      this.setState({
        min: min,
        max: max
      })
      */
      for (var i = min; i <= max + spacing; i += spacing) {
        newData.push({name: i, value: 0})
      }
      //console.log("NEWDATA:", newData)
      var j = 0;
      for (var i = 0; i < sortedData.length; i++) {
        //console.log('sortedData[i].name', sortedData[i].name, 'newData[j].name', newData[j].name)
        if (sortedData[i].name > newData[j].name) {
          j++
          i--
          continue
        }
        //🚸 Unknowns are being included:
        newData[j].value += sortedData[i].value
        //console.log('**', sortedData[i].name, sortedData[i].value)
      }
      return newData
    } else if (this.dataType() === 'datetime') {
      return sortedData
    } else {
      // String data points:
      return sortedData
    }
    // Min/Max
    // Spacing grouping
    // Exclude
  }

  //splitIntoCategories(set)

  onDataPropertyChanged(e) {
    this.setState({
      dataPropertyIndex: e.currentTarget.value
    })
  }

  render() {
    const selectDataProperty = dataStructures.map((ds, index) => 
      <li>
        <span><input
          type="radio"
          name="data"
          value={index}
          checked={parseInt(this.state.dataPropertyIndex) === index}
          onChange={this.onDataPropertyChanged}
          /> {ds.name}</span><br/>
      </li>
    )

    // Get the data for the chosen property
    const propertyData = this.extractProperty(
      this.state.data,
      this.state.dataPropertyIndex
    )

    // Unique values from propertyData
    const excludedValue = dataStructures[this.state.dataPropertyIndex].exclude
    var propertySet = [...new Set(propertyData)]

    // Turn array of values into vectors with values and frequency
    const vectors =
    this.vectorsFromSetAndValues(
      propertyData, propertySet, excludedValue
    )

    // If excludedValue is included in vectors then remove it:
    var comparableVectors = vectors
    var excluded = null
    if (vectors[0].name === excludedValue) {
      comparableVectors = vectors.slice(1, vectors.length)
      excluded = vectors.slice(0, 1)[0].value
    } 

    var chartData = 
    this.groupData(
      comparableVectors,
      1000000
    );

    // Need to extract value above and add in 'Unknown'
    // here because of differente excluded values in data
    chartData.push({name: 'Unknown', value: excluded})

    return (
      <div id="app">
        <h1>{this.state.title}</h1>
        <p>Min: {this.state.min}</p>
        <p>Max: {this.state.max}</p>
        
        {/*
        <div id="sliders">
          <label>1</label>
          <input type="range" min="1" max="100" value={this.state.data[0]} class="slider" id="slider-1" onChange={this.handleChange}></input>
          <label>2</label>
          <input type="range" min="1" max="100" value={this.state.data[1]} class="slider" id="slider-2" onChange={this.handleChange}></input>
          <label>3</label>
          <input type="range" min="1" max="100" value={this.state.data[2]} class="slider" id="slider-3" onChange={this.handleChange}></input>
          <label>4</label>
          <input type="range" min="1" max="100" value={this.state.data[3]} class="slider" id="slider-4" onChange={this.handleChange}></input>
          <label>5</label>
          <input type="range" min="1" max="100" value={this.state.data[4]} class="slider" id="slider-5" onChange={this.handleChange}></input>
        
        </div>
        */}
        <div id="min-max-sliders">
          <input
            type="range"
            min="1"
            max="100"
            value="50"
            class="slider"
            id="myRange"
          />
        </div>
        <ul>
          {selectDataProperty}
        </ul>

        <h3>Data:</h3>

        <BarChart
          data={chartData}
          numbe={this.isNumber}
          x={this.extractProperty(data, 'shape')}
          y={this.extractProperty(data, 'duration_minutes')}
        />
      </div>
    )
  }

}


ReactDOM.render(<App/>, document.getElementById('main'));
