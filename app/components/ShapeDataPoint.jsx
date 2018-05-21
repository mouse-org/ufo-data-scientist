const React = require('react');

function ShapeDataPoint(props) {
  return (
      <ul
        className="sighting-data"
      >
        <li>Name: {props.dataPoint.shape}</li>
        <li>Sightings: {props.dataPoint.sightings}</li>
        <br/>
      </ul>
    );
}

module.exports = ShapeDataPoint;
