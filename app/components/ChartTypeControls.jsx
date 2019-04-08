const React = require('react');
const chartOptions = require('../helpers/chartOptions')

function ChartTypeControls(props) {

  const controlStyle = {
    border: '1px solid orange',
    padding: '10px',
    margin: '10px'
  }

  function onChartTypeChanged(event) {
    const newChartType = chartOptions[event.currentTarget.value].name
    props.onChartTypeChanged(newChartType)
  }

  const options = chartOptions.map((o, i) => 
    <div key={o.name}>
      <input
        type="radio"
        
        value={i}
        checked={props.chartType === o.name}
        onChange={onChartTypeChanged}
      />
      <label>{o.name}</label>
    </div>
  )

  return (
    <div className="control" style={controlStyle} >
      
      <p>Chart Type: {props.chartType}</p>
      <div id="datetime-function-select">
        {options}
      </div>

    </div>
  );
}


module.exports = ChartTypeControls;