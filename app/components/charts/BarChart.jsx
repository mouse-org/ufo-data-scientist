const React = require('react')
const d3 = require("d3")

const findMaxInArrays = require('../../helpers/findMaxInArrays')

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.drawChart = this.drawChart.bind(this)
    this.viz = this.viz.bind(this)
    this.state = {
    }
  }

  /*shouldComponentUpdate() { return true }*/

  componentDidUpdate(prevProps) {
    this.viz()
  }

  viz() {
    this.drawChart(this.props.data, this.state.vizMultiplier)
  }

  componentWillReceiveProps() {
    
  }

  componentDidMount() {
    this.viz()
  }

  drawChart(data, vizMultiplier) {
    console.log("DRAW CHART DATA:", data)
    
    function updateChart() {
      
      const max = findMaxInArrays([data], 'value')
      const width = document.getElementById("viz").offsetWidth * .9

      var xScale = d3
      .scaleLinear()
      .domain([0, max]) // input
      .range([0, width]); // output

      // 6.
      /*
      var yScale = d3
      .scaleLinear()
      .domain([0, max]) // input 
      .range([height, 0]); // output
      */

      var sel = d3.select("#viz")
      .selectAll("div")
      .data(data)
      // These are when bars are redrawn
      .style("width", d => xScale(d.value)  + 'px')
      .text(d => d.name + ': ' + d.value)

      sel.enter()
      .append("div")
      // These are when bars are initially drawn
      .style("width", d => xScale(d.value) + 'px') //this.state.vizMultiplier
      .text(d => d.name + ': ' + d.value)

      sel.exit().remove()
    }
    updateChart()
  }

  render() {
    //console.log("DATA:", this.props.data)
    const showData = this.props.data.map(d => 
      <li key={d.name}>{d.name}: {d.value}</li>
    )

    return (
      <div id="container">

        <h3>Data 2:</h3>
        <ul>{showData}</ul>

        <h3>Bar Chart:</h3>

        <div id="viz"></div>

      </div>
    )
  }

}

module.exports = BarChart;