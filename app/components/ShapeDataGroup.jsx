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

    var name;
    if (!this.props.dataGroup.editing) {
      name =
        <li>
          Name: {this.props.dataGroup.dataGroupName}
          <button
            onClick={() => this.props.toggleEditGroupName(this.props.index)}
          >
            ✏️
          </button>
        </li>;
    } else {
      name =
      <li>
        Name:
        <input
          type="text"
          value={this.props.dataGroup.dataGroupName}
          onChange={e => this.props.onDataGroupNameChange(this.props.index, e.target.value)}
        ></input>
        <button
          onClick={() => this.props.toggleEditGroupName(this.props.index)}
        >
          ✅
        </button>
      </li>
    }


    return(
      <ul
        className="datapoint">
        {name}
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
