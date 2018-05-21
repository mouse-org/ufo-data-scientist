const React = require('react');
const ReactDOM = require('react-dom');
const uuidv4 = require('uuid/v4');

const data = require('./data');

// Components:
const Section = require('./components/Section');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
    this.updateGroup = this.updateGroup.bind(this);
    this.moveDataPoint = this.moveDataPoint.bind(this);
    this.onDataGroupNameChange = this.onDataGroupNameChange.bind(this);
    this.toggleEditGroupName = this.toggleEditGroupName.bind(this);
    this.removeDataGroup = this.removeDataGroup.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);

    const ufoDataMap = data.ufoShapes.map(shape => {
      // dataGroup

      let metaData = {
        dataPointId: uuidv4()
      }

      return {
        dataGroupId: uuidv4(),
        dataGroupName: shape.shape,
        customGroupName: false,
        totalSightings: shape.sightings,
        editing: false,
        collapsed: false,
        dataPoints: [Object.assign({}, metaData, shape)]
      }
    });

    this.state = {
      title: "UFO Data Scientist",
      data: {
        shapeDataGroups: ufoDataMap
      },
      currentSection: "CleanData",
      groupActions: {
        CleanData: [
          {
            text: ["A - Z", "Z - A"],
            action: this.sort.bind(null, "dataGroupName"),
            toggle: false
          },
          {
            text: ["📈", "📉"],
            action: this.sort.bind(null, "totalSightings"),
            toggle: false
          }
        ]
      },
      /*
      pointActions: {
        CleanData: [
          {
            enabledText: '🔵',
            notEnabledText: '◻️',
            action: this.toggleDuplicate
          }
        ]
      }
      */
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  updateGroup(group) {
    group = this.updateTotalSightings(group);
    group = this.updateDataGroupName(group);
    return group;
  }

  compare(prop, toggle, a, b) {
    var aU, bU;
    if (typeof a[prop] === 'string' && typeof b[prop] === 'string') {
      aU = a[prop].toUpperCase();
      bU = b[prop].toUpperCase();
    } else {
      aU = a[prop];
      bU = b[prop];
    }
    if (aU < bU)
      if (toggle) {
        return 1;
      } else {
        return -1;
      }
    if (aU > bU)
      if (toggle) {
        return -1;
      } else {
        return 1;
      }
    return 0;
  }

  sort(prop, index, toggle) {
    this.setState((prevState, props) => {
      let newData = prevState.data;
      newData.shapeDataGroups.sort(this.compare.bind(null, prop, toggle));
      // Toggle the 'toggle' property for the clicked groupAction
      let newGroupActions = prevState.groupActions
      newGroupActions[prevState.currentSection][index].toggle = !toggle;
      return {
      data: newData
      }
    });
  }

  moveDataPoint(movedDataPointId, destDataGroupId, sourceDataGroupId, nextDataPointId) {

    this.setState((prevState, props) => {
      var newData = prevState.data;
      var destDataGroup;
      var sourceDataGroup;
      var movedDataPoint;
      var dataPointNewIndex;

      // From each dataGroup:
      for (var i = 0; i < newData.shapeDataGroups.length; i++) {

        // Find dragged dataPoint in source dataGroup
        var group = newData.shapeDataGroups[i];
        if (group.dataGroupId === sourceDataGroupId) {
          sourceDataGroup = group;
          for (var j = 0; j < group.dataPoints.length; j++) {
            var dataPoint = group.dataPoints[j];
            if (dataPoint.dataPointId === movedDataPointId) {
              movedDataPoint = dataPoint;
              // Remove dragged dataPoint from source Group
              group.dataPoints.splice(j, 1);
              break;
            }
          }
        }

        // Find new dataPoint parent and new (next) sibling
        if (group.dataGroupId === destDataGroupId) {
          destDataGroup = group;
          // new index is not last in group
          if (nextDataPointId) {
            for (var j = 0; j < group.dataPoints.length; j++) {
              var dataPoint = group.dataPoints[j];
              if (dataPoint.dataPointId === nextDataPointId) {
                dataPointNewIndex = j;
                break;
              }
            }
          } else {
            //new index *is* last in group
            dataPointNewIndex = destDataGroup.dataPoints.length;
          }
        }

        if (sourceDataGroup && destDataGroup) {
          break;
        }
      }

      destDataGroup.dataPoints.splice(dataPointNewIndex, 0, movedDataPoint);
      sourceDataGroup = this.updateGroup(sourceDataGroup);
      destDataGroup = this.updateGroup(destDataGroup);

      return {
        data: newData
      }
    });
  }

  toggleEditGroupName(index) {
    this.setState((prevState, props) => {
      let newData = prevState.data;
      var group = newData.shapeDataGroups[index];
      group.editing = !group.editing;
      return {
        data: newData
      }
    });
  }

  onDataGroupNameChange(index, newName) {
    this.setState((prevState, props) => {
      let newData = prevState.data;
      var group = newData.shapeDataGroups[index];
      group.customGroupName = true;
      group.dataGroupName = newName;
      return {
        data: newData
      }
    });
  }

  updateDataGroupName(group) {
    if (group.dataPoints.length > 0){
      if (!group.customGroupName){
        group.dataGroupName = group.dataPoints[0].shape
      }
    } else {
      group.dataGroupName = "";
      group.customGroupName = false;
    }

    return group;
  }

  removeDataGroup(index) {
    this.setState((prevState, props) => {
      let newData = prevState.data;
      newData.shapeDataGroups.splice(index, 1);
      return {
        data: newData
      }
    });
  }

  toggleCollapse(index) {
    this.setState((prevState, props) => {
      let newData = prevState.data;
      var group = newData.shapeDataGroups[index];
      group.collapsed = !group.collapsed;
      return {
        data: newData
      }
    });
  }

  updateTotalSightings(group) {
    var totalSightingsReducer = (accumulator, currentValue) => accumulator + currentValue.sightings;
    group.totalSightings = group.dataPoints.reduce(totalSightingsReducer, 0);
    return group;
  }

  render() {

    let setActions = [];
    let pointActions = [];
    if (this.state.currentSection === "CleanData") {
    }

    return (
      <div id="app">
        <h1>{this.state.title}</h1>
        <Section
          shapeDataGroups={this.state.data.shapeDataGroups}
          currentSection={this.state.currentSection}
          groupActions={this.state.groupActions}

          moveDataPoint={this.moveDataPoint}
          onDataGroupNameChange={this.onDataGroupNameChange}
          toggleEditGroupName={this.toggleEditGroupName}
          removeDataGroup={this.removeDataGroup}
          toggleCollapse={this.toggleCollapse}
        ></Section>
      </div>
    )
  }

}


ReactDOM.render(<App/>, document.getElementById('main'));
