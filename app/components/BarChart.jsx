const React = require('react')
//var BarChart = require("react-chartjs-2").Bar;
var d3 = require("d3")

class BarChart extends React.Component {

  componentShouldUpdate() {
    //return false
  }

  componentDidUpdate(prevProps) {
    this.drawChart(this.props.data.map((d,i) => { return {name: i, value: d}}))
  }

  componentWillReceiveProps() {
    
  }

  componentDidMount() {
    this.drawChart(this.props.data.map((d,i) => { return {name: i, value: d}}))
  }

  drawChart(data) {

    var width = 960,
    height = 500;

    var margin = ({top: 20, right: 0, bottom: 30, left: 40})
    function updateChart() {
      var sel = d3.select("#viz")
      .selectAll("div")
      .data(data)
      .style("width", d => d.value * 10 + 'px')
      .text(d => d.name + ': ' + d.value)

      sel.enter()
      .append("div")
      .style("width", d => d.value * 10 + 'px')
      .text(d => d.name + ': ' + d.value)

      sel.exit().remove()
    }
    updateChart()

  }

  render() {

    const showData = this.props.data.map((d,i) => 
      <li>{i}: {d}</li>
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