const React = require('react')
//var BarChart = require("react-chartjs-2").Bar;
var d3 = require("d3")

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.drawChart = this.drawChart.bind(this)
    this.viz = this.viz.bind(this)
    this.state = {
      vizMultiplier: .5
    }
  }

  /*
  shouldComponentUpdate() {
    return true
  }
  */

  componentDidUpdate(prevProps) {
    this.viz()
  }

  viz() {
    if (this.props.number) {
      const mappedData = this.props.data.map((d,i) => ({name: i, value: d}))
      this.drawChart(mappedData, this.state.vizMultiplier)
    } else {
      this.drawChart(this.props.data, this.state.vizMultiplier)
    }
  }

  componentWillReceiveProps() {
    
  }

  componentDidMount() {
    this.viz()
  }

  drawChart(data, vizMultiplier) {
    //console.log("DRAW CHARAT DATA:", data)
    //console.log("VM:", vizMultiplier)
    var width = 960,
    height = 500;

    var margin = ({top: 20, right: 0, bottom: 30, left: 40})
    function updateChart() {
      var sel = d3.select("#viz")
      .selectAll("div")
      .data(data)
      .style("width", d => d.value * vizMultiplier + 'px')
      .text(d => d.name + ': ' + d.value)

      sel.enter()
      .append("div")
      .style("width", d => d.value * vizMultiplier + 'px') //this.state.vizMultiplier
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