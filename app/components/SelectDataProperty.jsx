const React = require('react');
const dataStructures = require('../helpers/dataStructures')

module.exports = function SelectDataProperty(props) {
    function inputFromDataStructure(currentIndex, onChanged, name, ds, index) {
      return (
        <li key={props.type + '-' + ds.name}>
          <span>
            <input
            type="radio"
            name={props.type + '-' + name}
            value={index}
            onChange={(e) => onChanged(props.type, e)}
            checked={parseInt(currentIndex) === index}
            />
            {ds.name}
          </span>
          <br/>
        </li>
      )
    }

    const dSMap = inputFromDataStructure.bind(
      this,
      props.dataPropertyIndex,
      props.onDataPropertyChanged,
      'data-property'
    )
    const dataPropertyList = dataStructures.map(dSMap)

    const selectDataProperty = <div><ul>{dataPropertyList}</ul></div>

    /*
    var dataStructuresAndSightings = dataStructures.slice(0, dataStructures.length)
    dataStructuresAndSightings.push({name: "sightings"})

    const dS2Map = inputFromDataStructure.bind(
      this,
      props.secondaryDataPropertyIndex,
      props.onSecondaryDataPropertyChanged,
      'secondary-data-property'
    )
    const secondaryDataPropertyList = dataStructuresAndSightings.map(dS2Map)

    const selectSecondaryDataProperty = <div><ul>{secondaryDataPropertyList}</ul></div>
    */

    return (
      <div>
        <h3>{props.type} Data Property</h3>
        <h6>Dataset Index: {props.dataPropertyIndex}</h6>
        {selectDataProperty}
      </div>
    );
  }