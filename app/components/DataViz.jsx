const React = require('react');
var BarChart = require("react-chartjs-2").Bar;

function DataViz(props) {

  var barData = {
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,5267,734,784,433]
        }
      ]
    }

  var barOptions = {
      legend: { display: false },
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050'
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
