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
      max: 1
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

  extractProperty(data, labelIndex, transformation = (i => i)) {
    console.log("LENGTH:", data.length)
    //console.log("Before Extract Property:", data)
    const extractedData = data.map(d => d[labelIndex])
    //console.log("Extracted:", extractedData)
    //return extractedData;
    return extractedData.map(transformation)
  }

  // Takes data with 1 property (created using extractProperty())
  consolidateData(extData, labelIndex) {
    // Store unique values in extDataSet:
    var extDataSet = [...new Set(extData)];

    // Create empty object for value vectors and labels
    var consolidatedDataObj = {};
    // Add property with value 0 for every unique value in extDataSet
    extDataSet.map(d => consolidatedDataObj[d] = 0)
    
    // For every data point increment value of corresponding property
    extData.map(d => consolidatedDataObj[d] += 1)
    
    // Remove unknown/blank values here:
    const exclude = dataStructures[labelIndex].exclude;
    console.log("** EXCLUDE:", exclude)

    var consolidatedData = [];
    for (var i in consolidatedDataObj) {
      var d = consolidatedDataObj[i];
      var name = isNaN(parseFloat(i)) ? i : parseFloat(i);
      consolidatedData.push({name: name, value: parseInt(d), oldName: i})
    }
    return consolidatedData;
  }

  isNumber() {
    return dataStructures[this.state.dataPropertyIndex].type === 'number'
  }

  // 🚸 'name is hard coded
  groupData(data, spacing) {
    var newData = [];
    const sortedData = data.sort(compareObjects.bind(this, 'name'))
    console.log("SORTED:", sortedData)
    if (this.isNumber()){
      console.log("# #*# *# *# NUMBER")
      var min = Math.floor(sortedData[0].name);
      var max = Math.ceil(sortedData[sortedData.length - 2].name);
      for (var i = min; i <= max + spacing; i += spacing) {
        newData.push({name: i, value: 0})
      }
      console.log("NEWDATA:", newData)
      var j = 0;
      for (var i = 0; i < sortedData.length; i++) {
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
    } else {
      console.log("* * * NOT NUMBER")
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
    console.log("DSDS:", dataStructures)
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

    
    // 🚸 'name is hard coded
    const chartData = this.groupData(
      this.consolidateData(
        this.extractProperty(
          this.state.data, this.state.dataPropertyIndex
        ), this.state.dataPropertyIndex
      ).sort(compareObjects.bind(this, 'name')),
      1000000
    );

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
