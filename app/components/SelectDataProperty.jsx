const React = require('react');
const dataStructures = require('../helpers/dataStructure')

module.exports = function SelectDataProperty(props) {
    const selectDataProperty = dataStructures.map((ds, index) => 
      <li key={ds.name}>
        <span>
          <input
          type="radio"
          name="data"
          value={index}
          onChange={props.onDataPropertyChanged}
          checked={parseInt(props.dataPropertyIndex) === index}
          />
          {ds.name}
        </span>
        <br/>
      </li>
    )
    
    return (
      <React.Fragment>
        <ul>
            {selectDataProperty}
        </ul>
        <h3>Dataset: {props.dataPropertyIndex}</h3>
      </ React.Fragment>
    );
  }