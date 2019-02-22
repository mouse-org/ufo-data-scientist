const React = require('react');
const datePartOptions = require('../helpers/datePartOptions')

function DateTimeDataSetControls(props) {

  const controlStyle = {
    border: '1px solid orange',
    padding: '10px',
    margin: '10px'
  }

  const options = datePartOptions.map((o, i) => 
    <div>
      <input
        type="radio"
        key={o.name}
        value={i}
        checked={props.datePart === o.name}
        onChange={props.onDatePartChanged}
      />
      <label>{o.name}</label>
    </div>
  )

  return (
    <div className="control" style={controlStyle} >
      
      <h2>Date Time Data Set: { props.label }</h2>
      <p>Date Part: {props.datePart}</p>
      <div id="datetime-function-select">
        {options}
      </div>

    </div>
  );
}


module.exports = DateTimeDataSetControls;
