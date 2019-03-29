const React = require('react');

function NumberDataSetControls(props) {

  const controlStyle = {
    border: '1px solid green',
    padding: '10px',
    margin: '10px'
  }

  return (
    <div className="control" style={controlStyle} >
      <h3>Number Data Set: { props.label }</h3>

      <h4>Min/Max:</h4>
      <p>Dataset Min: {props.absMin}</p>
      <p>Dataset Max: {props.absMax}</p>

      <label>Number Zoom: ({props.numberZoom})</label>
      <div id="number-zoom-slider">
        <input
          type="range"
          min="2"
          max={props.dataLength > props.maxNumberZoom ? props.maxNumberZoom : props.dataLength}
          value={props.numberZoom}
          onChange={props.onNumberZoomChanged}
          className="slider"
          id="number-zoom"
        />
      </div>
      <p>Range Min: ({props.rangeMin}) [{props.absMin}]</p>
      <p>Range Max: ({props.rangeMax}) [{props.absMax}]</p>
      <div id="min-max-sliders">
        <label>Range Max:</label>
        <input
          type="range"
          min={props.absMin}
          max={props.absMax}
          value={props.rangeMax}
          onChange={props.onRangeMaxChanged}
          className="slider"
          id="min-max"
        />
        <label>Range Min:</label>
        <input
          type="range"
          min={props.absMin}
          max={props.absMax}
          value={props.rangeMin}
          onChange={props.onRangeMinChanged}
          className="slider"
          id="min-max"
        />
      </div>
    </div>
  );
}


module.exports = NumberDataSetControls;
