const React = require('react');
const ShapeDataPoint = require('./ShapeDataPoint');

class ShapeDataGroup extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.props.addDragContainer(this.itemRow);
  }

  render() {

    var dataPointItems = this.props.dataGroup.dataPoints.map((dataPoint, index) => {
      return (
          <li
            id={dataPoint.dataPointId}
          >
            <ShapeDataPoint
              dataPoint={dataPoint}
              addDragContainer={this.props.addDragContainer}
            ></ShapeDataPoint>
          </li>
        )
    });


    return(
      <ul
        className="datapoint">
        <li>
          {this.props.dataGroup.dataGroupName}
          <button>✏️</button>
        </li>
        <li>Total Sightings: {this.props.dataGroup.totalSightings}</li>
        <ul
          id={this.props.dataGroup.dataGroupId}
          className="sighting-data-list"
          ref={(itemRow) => { this.itemRow = itemRow; }}
        >
          {dataPointItems}
        </ul>
      </ul>
    );
  }
}




module.exports = ShapeDataGroup;
