const React = require('react');
const ShapeDataPoint = require('./ShapeDataPoint');

//const ShapeList = function(props) {

class ShapeList extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.props.addDragContainer(this.itemRow);
  }

  totalSightings() {
    var totalSightingsReducer = (accumulator, currentValue) => accumulator + currentValue.sightings;
    var totalSightings = this.props.shapeContainer.shapes.reduce(totalSightingsReducer, 0);
    return totalSightings;
  }

  render() {

    var dataPointList = this.props.shapeContainer.shapes.map((shape, index) => {
      return (
          <li
            id={shape.shapeId}
          >
            <ShapeDataPoint
              shape={shape}
              addDragContainer={this.props.addDragContainer}
            ></ShapeDataPoint>
          </li>
        )
    });


    return(
      <ul
        className="datapoint">
        <li>{this.props.shapeContainer.dataPointId}</li>
        <li>Total Sightings: {this.totalSightings()}</li>
        <ul
          id={this.props.shapeContainer.dataPointId}
          className="sighting-data-list"
          ref={(itemRow) => { this.itemRow = itemRow; }}
        >
          {dataPointList}
        </ul>
      </ul>
    );
  }
}




module.exports = ShapeList;
