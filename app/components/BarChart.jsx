const React = require('react')
//var BarChart = require("react-chartjs-2").Bar;
var d3 = require("d3")

class BarChart extends React.Component {

  componentShouldUpdate() {
    //return false
  }

  componentDidMount() {
    this.drawChart([1,2,3,4,5,6,19,20].map((d,i) => { return {name: i, value: d}}))
  }

  drawChart(data) {
    var width = 960,
    height = 500;

    var margin = ({top: 20, right: 0, bottom: 30, left: 40})

    var x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1)

    var y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice()
      .range([height - margin.bottom, margin.top])

    var chart = d3.select("#viz")
        .attr("width", width)
        .attr("height", height);

    var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", function(d) { return "translate(" + x(d.name) + ",0)"; });
  
    bar.append("rect")
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .attr("width", x.bandwidth());
  
    bar.append("text")
        .attr("x", x.bandwidth() / 2)
        .attr("y", function(d) { return y(d.value) + 3; })
        .attr("dy", ".75em")
        .text(function(d) { return d.value; });


  }

  render() {
    return (
      <div id="container">
        <h3>Bar Chart:</h3>

        <div id="viz"></div>

      </div>
    )
  }

}

module.exports = BarChart;