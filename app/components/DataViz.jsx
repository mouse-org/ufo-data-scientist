const React = require('react');
var BarChart = require("react-chartjs-2").Bar;
var BubbleChart = require("react-chartjs-2").Bubble;
var LineChart = require("react-chartjs-2").Line;
var distinctColors = require("distinct-colors");
const rgbHex = require('rgb-hex');

function DataViz(props) {

  var c = distinctColors({count: 25}).map(x => '#' + rgbHex(x._rgb[0], x._rgb[1], x._rgb[2]));
  function backgroundColors(c) {
    return (
      props.dataGroups.map((group, index) => {
        let i = index % c.length;
        return c[i];
      })
    )
  };

  var barData = {
    labels: props.dataGroups.map(group => group.dataGroupName),
    datasets: [
      {
        label: "Sightings",
        backgroundColor: backgroundColors(c),
        data: props.dataGroups.map(group => group.totalSightings)
      }
    ]
  }

  var barOptions = {
    legend: { display: false },
    title: {
      display: true,
      text: 'UFO Sightings by Shape'
    }
  }

  var bubbleData = {
  }

  var bubbleOptions = {
  }

  var lineData = {
    // Each shape could be a dataset
  }

  var lineOptions = {
    legend: { display: false },
    title: {
      display: true,
      text: 'UFO Sightings by Shape over Time'
    }
  }

  var barChart = <BarChart data={barData} options={barOptions} width="600" height="250" />
  var bubbleChart = <BubbleChart data={barData} options={barOptions} width="600" height="250" />
  var lineChart = <LineChart data={lineData} options={lineOptions} width="600" height="250" />

  var chart = barChart;
  if(props.chartType != 'bar') {
    if (props.chartType === 'bubble') {
      chart = bubbleChart;
    } else if (props.chartType === 'line') {
      chart = lineChart;
    } else {
      chart = barChart;
    }
  }

  return (
    <div id="data-viz">
      <h1>Data Viz</h1>
      <h2>Chart Type: {props.chartType}</h2>
      <button
        onClick={() => props.onChartTypeChange("bar")} 
      >Bar</button>
      <button
        onClick={() => props.onChartTypeChange("bubble")}
      >Bubble</button>
      <button
        onClick={() => props.onChartTypeChange("line")}
      >Line</button>
        
      {chart}

    </div>
  );
}

module.exports = DataViz;
