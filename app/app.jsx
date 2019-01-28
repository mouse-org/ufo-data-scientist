const React = require('react');
const ReactDOM = require('react-dom');
const uuidv4 = require('uuid/v4');

//const data = require('./fullData');
const data = require('./data');
//const defaultGroup = require('./helpers/defaultGroup');
//const breakApartData = require('./helpers/breakApartData');

// Components:
//const Section = require('./components/Section');

//const sections = ["SeeAllData", "CleanData", "DataViz"];

const BarChart = require('./components/BarChart')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "UFO Data Scientist",
      data: data
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  extractSet(data, label, transformation = ((i) => i)) {
    const extractedData = data.map(d => d[label])
    return extractedData.map(transformation)
  }

  //splitIntoCategories(set)

  render() {

    return (
      <div id="app">
        <h1>{this.state.title}</h1>
        <BarChart
          data={[24, 26, 38, 41, 56, 69]}
          x={this.extractSet(data, 'shape')}
          y={this.extractSet(data, 'duration_minutes')}
        />
      </div>
    )
  }

}


ReactDOM.render(<App/>, document.getElementById('main'));
