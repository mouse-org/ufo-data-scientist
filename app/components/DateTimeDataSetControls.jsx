const React = require('react');
const datePartOptions = require('../helpers/datePartOptions')

function DateTimeDataSetControls(props) {

  const controlStyle = {
    border: '1px solid orange',
    padding: '10px',
    margin: '10px'
  }

  const options = datePartOptions.map((o, i) => 
    <div key={o.name}>
      <input
        type="radio"
        
        value={i}
        checked={datePartOptions[props.datePartIndex].name === o.name}
        onChange={(e) => props.onDatePartChanged(props.type, e)}
      />
      <label>{o.name}</label>
    </div>
  )

  return (
    <div className="control" style={controlStyle} >
      
      <h3>Date Time Data Set: { props.label }</h3>
      <p>Date Part: {datePartOptions[props.datePartIndex].name}</p>
      <div id="datetime-function-select">
        {options}
      </div>

    </div>
  );
}


module.exports = DateTimeDataSetControls;
