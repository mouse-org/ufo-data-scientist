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

    var deleteButton;
    if (this.props.dataGroup.dataPoints.length === 0) {
      deleteButton =
        <button
          className="remove-data-group"
          onClick={() => this.props.removeDataGroup(this.props.index)}
        >
          ⛔️
        </button>
    }

    var collapseExpandText;
    if (this.props.dataGroup.collapsed) {
      collapseExpandText = "↕️";
    } else {
      collapseExpandText = "⤴️";
    }
    var collapseExpandButton =
      <button
        className="collapse-expand-button"
        onClick={() => this.props.toggleCollapse(this.props.index)}
      >{collapseExpandText}</button>

    // Have to hide this way instead of conditionally rendering because conditionally rendering breaks the drag and drop when toggled.
    var dataPointListClass;
    var dataPointTotalClass;
    if (!this.props.dataGroup.collapsed) {
      dataPointListClass = "shown-data-points"
      dataPointTotalClass = "hidden-data-points"
    } else {
      dataPointListClass = "hidden-data-points"
      dataPointTotalClass = "shown-data-points"
    }
    var dataPointList =
    <li>
      <ul
        id={this.props.dataGroup.dataGroupId}
        className={"sighting-data-list " + dataPointListClass}
        ref={(itemRow) => { this.itemRow = itemRow; }}
      >
        {dataPointItems}
      </ul>
      <span className={dataPointTotalClass}>Data Points: {this.props.dataGroup.dataPoints.length}</span>
    </li>


    return(
      <ul
        className="datapoint">
        {deleteButton}
        {name}
        <li>Total Sightings: {this.props.dataGroup.totalSightings}</li>
        {dataPointList}
        {collapseExpandButton}
      </ul>
    );
  }
}




module.exports = ShapeDataGroup;
