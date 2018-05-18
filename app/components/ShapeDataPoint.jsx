const React = require('react');
var dragula = require('react-dragula');

class ShapeDataPoint extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <ul
        className="sighting-data"
      >
        <li>Name: {this.props.dataPoint.shape}</li>
        <li>Sightings: {this.props.dataPoint.sightings}</li>
        <br/>
      </ul>

    );
  }
}

module.exports = ShapeDataPoint;
