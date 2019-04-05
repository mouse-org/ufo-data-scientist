const React = require('react')
const d3 = require('d3')
const randomColor = require('randomcolor')

const findMaxInArrays = require('../../helpers/findMaxInArrays')

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.drawChart = this.drawChart.bind(this)
    this.viz = this.viz.bind(this)
    this.state = {
    }
  }

  componentDidUpdate(prevProps) {
    d3.selectAll("svg").remove();
    this.viz()
  }

  viz() {
   this.drawChart(this.props.data)
  }

  componentWillReceiveProps() {
    
  }

  componentDidMount() {
    this.viz()
  }

  drawChart(data) {
    //console.log("DRAW CHART DATA:", data)
    var margin = ({top: 20, right: 0, bottom: 30, left: 40})
    var updateChart = () => {
      const height = 330
      var max
      var min
      for (var i in data) {
        var itemMax = findMaxInArrays([data[i]], 'value')
        var inverseDS = data[0].map(d => -d.value)
        var itemMin = findMaxInArrays([inverseDS], false) * -1
        if (!max || itemMax > max) {
          max = itemMax
        }
        if (!min || itemMin < min) {
          min = itemMin
        }
      }
      const width = document.getElementById("viz").offsetWidth * .9

      var ds
      var allDatasets = []
      for (var i in data) {
        ds = data[i].map(d => ({y: d.value}))
        allDatasets.push(ds)
      }


      var xScale = d3
      .scaleLinear()
      .domain([0, allDatasets[0].length]) // input
      .range([0, width]); // output

      // 6. 
      var yScale = d3
      .scaleLinear()
      .domain([min, max]) // input 
      .range([height, 0]); // output 

      // 7. d3's line generator
      var line = d3
      .line()
      .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
      .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
      .curve(d3.curveMonotoneX) // apply smoothing to the line

      var svg = d3.select("#viz")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")

      for (var i in allDatasets) {
        
      }

      for (var i in allDatasets) {
        ds = allDatasets[i]
        svg.append("path")
        .datum(ds) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("style", "stroke: " + randomColor())
        .attr("d", line); // 11. Calls the line generator
      }

      
      svg.exit().remove()
    }
    updateChart()
  }

  render() {

    const showData = ''
    
    /*this.props.data.map(d => 
      <li key={d[0].name}>{d[0].name}: {d.map( i => {
        {i.value + ' - '}
      })}</li>
    )*/

    return (
      <div id="container">

        <h3>Data 2:</h3>
        <ul>{showData}</ul>

        <h3>Line Chart:</h3>

        <div id="viz"></div>

      </div>
    )
  }
}

module.exports = LineChart;