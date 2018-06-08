const React = require('react');

function ShapeDataPoint(props) {
  return (
      <ul
        className="sighting-data"
      >
        <li><strong>{props.dataPoint.shape}</strong></li>
        <li>{props.dataPoint.sightings}</li>
        <br/>
      </ul>
    );
}

module.exports = ShapeDataPoint;
