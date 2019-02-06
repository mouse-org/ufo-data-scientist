const React = require('react');
const ReactDOM = require('react-dom');
const uuidv4 = require('uuid/v4');

const data = require('./fullData');
//const data = require('./data');
//const defaultGroup = require('./helpers/defaultGroup');
//const breakApartData = require('./helpers/breakApartData');
const compareObjects = require('./helpers/compareObjects');

// Components:
//const Section = require('./components/Section');

//const sections = ["SeeAllData", "CleanData", "DataViz"];

const BarChart = require('./components/BarChart')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      title: "UFO Data Scientist",
      data: data
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

  extractProperty(data, label, transformation = (i => i)) {
    console.log("Before Extract Property:", data)
    const extractedData = data.map(d => d[label])
    console.log("Extracted:", extractedData)
    return extractedData;
    //return extractedData.map(transformation)
  }

  // Takes data with 1 property (created using extractProperty())
  consolidateData(extData) {
    var extDataSet = [...new Set(extData)];
    console.log("SET:", extDataSet)
    var consolidatedDataObj = {};
    extDataSet.map(d => consolidatedDataObj[d] = 0)
    console.log("ZEROS:", consolidatedDataObj)
    extData.map(d => consolidatedDataObj[d] += 1)
    console.log("VALUES:", consolidatedDataObj)
    var consolidatedData = [];
    for (var i in consolidatedDataObj) {
      var d = consolidatedDataObj[i];
      var name = isNaN(parseFloat(i)) ? i : parseFloat(i);
      consolidatedData.push({name: name, value: parseInt(d), oldName: i})
    }
    consolidatedData.sort(compareObjects.bind(this, 'name'));
    return consolidatedData;
  }

  //splitIntoCategories(set)

  render() {

    const chartData = this.consolidateData(
      this.extractProperty(this.state.data, 'duration_minutes')
    )

    return (
      <div id="app">
        <h1>{this.state.title}</h1>
        
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
        <h3>Data:</h3>

        <BarChart
          data={chartData}
          x={this.extractProperty(data, 'shape')}
          y={this.extractProperty(data, 'duration_minutes')}
        />
      </div>
    )
  }

}


ReactDOM.render(<App/>, document.getElementById('main'));
