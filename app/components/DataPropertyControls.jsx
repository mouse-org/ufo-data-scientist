const React = require('react');
const dataStructures = require('../helpers/dataStructure')
const NumberDataSetControls = require('./NumberDataSetControls')
const DateTimeDataSetControls = require('./DateTimeDataSetControls')

const settings = require('../helpers/settings')

module.exports = function DataPropertyControls(props) {

    const dataType = dataStructures[props.dataPropertyIndex].type
    const dataName = dataStructures[props.dataPropertyIndex].name

    var controls = []
    if (dataType === 'number') {
      controls.push(<NumberDataSetControls
        label={dataName}
        key={dataName}
        rangeMin={props.rangeMin}
        rangeMax={props.rangeMax}
        min={props.min}
        max={props.max}
        onRangeMaxChanged={props.onRangeMaxChanged}
        onRangeMinChanged={props.onRangeMinChanged}
        data={props.data}
        numberZoom={props.numberZoom}
        maxNumberZoom={settings.maxNumberZoom}
        onNumberZoomChanged={props.onNumberZoomChanged}
      />)
    } else if (dataType === 'datetime') {
      controls.push(<DateTimeDataSetControls
        label={dataName}
        key={dataName}
        datePart={props.datePart}
        onDatePartChanged={props.onDatePartChanged}
      />)
    }
    
    return (
      <React.Fragment>
        {controls}
      </ React.Fragment>
    );
  }