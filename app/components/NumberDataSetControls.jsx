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
          onChange={(e) => props.onNumberZoomChanged('primary', e)}
          className="slider"
          id="number-zoom"
        />
      </div>
      <p>Range Min: {props.rangeMin}</p>
      <p>Range Max: {props.rangeMax}</p>
      <div id="min-max-sliders">
        <label>Range Max:</label>
        <input
          type="range"
          min={props.absMin}
          max={props.absMax}
          value={props.rangeMax}
          onChange={(e) => props.onRangeMaxChanged('primary', e)}
          className="slider"
          id="min-max"
        />
        <label>Range Min:</label>
        <input
          type="range"
          min={props.absMin}
          max={props.absMax}
          value={props.rangeMin}
          onChange={(e) => props.onRangeMinChanged('primary', e)}
          className="slider"
          id="min-max"
        />
      </div>
    </div>
  );
}


module.exports = NumberDataSetControls;
