const React = require('react');
var BarChart = require("react-chartjs-2").Bar;
var BubbleChart = require("react-chartjs-2").Bubble;

function DataViz(props) {

  var c = ["#3e95cd", "#8e5ea2","#3cba9f"];
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

  return (
    <div id="data-viz">
      <h1>Data Viz</h1>

      <BarChart data={barData} options={barOptions} width="600" height="250"/>

    </div>
  );
}

module.exports = DataViz;
