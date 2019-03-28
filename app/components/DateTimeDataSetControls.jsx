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
        checked={props.datePart === o.name}
        onChange={props.onDatePartChanged}
      />
      <label>{o.name}</label>
    </div>
  )

  return (
    <div className="control" style={controlStyle} >
      
      <h3>Date Time Data Set: { props.label }</h3>
      <p>Date Part: {props.datePart}</p>
      <div id="datetime-function-select">
        {options}
      </div>

    </div>
  );
}


module.exports = DateTimeDataSetControls;
