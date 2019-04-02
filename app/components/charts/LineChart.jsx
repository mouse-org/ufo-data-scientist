const React = require('react')
const d3 = require("d3")

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
    console.log("DID UPDATE")
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
    console.log("DRAW Line CHART DATA:", data)
 
    var margin = ({top: 20, right: 0, bottom: 30, left: 40})
    function updateChart() {
      const height = 330
      const max = findMaxInArrays([data], 'value')
      const minDS = data.map(d => -d.value)
      const min = findMaxInArrays([minDS], false) * -1
      const width = document.getElementById("viz").offsetWidth * .9

      console.log("UPDATE CHART", max, width)
      //var ds = [{y: 5}, {y: 3}, {y: 5}, {y: 6}, {y: 7}]
      var ds = data.map(d => ({y: d.value}))
      // TEMPORARY
      //var ds2 = data.map(d => ({y: d.value / 2}))

      var xScale = d3
      .scaleLinear()
      .domain([0, ds.length]) // input
      .range([0, width]); // output

      // 6. 
      var yScale = d3
      .scaleLinear()
      .domain([0, max]) // input 
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

      svg.append("path")
      .datum(ds) // 10. Binds data to the line 
      .attr("class", "line") // Assign a class for styling 
      .attr("d", line); // 11. Calls the line generator
      
      /*
      svg.append("path")
      .datum(ds2) // 10. Binds data to the line 
      .attr("class", "line") // Assign a class for styling 
      .attr("d", line); // 11. Calls the line generator
      */
      
      svg.exit().remove()
    }
    updateChart()
  }

  render() {

    const showData = this.props.data.map(d => 
      <li key={d.name}>{d.name}: {d.value}</li>
    )

    //const showData = <h1>Data</h1>

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