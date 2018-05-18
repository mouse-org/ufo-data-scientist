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

    const ufoDataMap = data.ufoShapes.map(shape => {
      // dataGroup
      return {
        dataGroupId: uuidv4(),
        dataGroupName: shape.shape,
        customGroupName: "",
        totalSightings: shape.sightings,
        dataPoints: [Object.assign({}, {dataPointId: uuidv4()}, shape)]
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
            text: "A - Z",
            action: this.sort.bind(null, "dataGroupName")
          },
          {
            text: "📈",
            action: this.sort.bind(null, "totalSightings")
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

  compare(p, a, b) {
    var aU, bU;
    if (typeof a[p] === 'string' && typeof b[p] === 'string') {
      aU = a[p].toUpperCase();
      bU = b[p].toUpperCase();
    } else {
      aU = a[p];
      bU = b[p];
    }
    if (aU < bU)
      return -1;
    if (aU > bU)
      return 1;
    return 0;
  }

  sort(prop) {
    this.setState((prevState, props) => {
      let newData = prevState.data;
      newData.shapeDataGroups.sort(this.compare.bind(null, prop));

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

  updateDataGroupName(group) {
    if (!group.customGroupName){
      if (group.dataPoints.length > 0){
        group.dataGroupName = group.dataPoints[0].shape
      } else {
        group.dataGroupName = "";
      }
    }
    return group;
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
          moveDataPoint={this.moveDataPoint}
          currentSection={this.state.currentSection}
          groupActions={this.state.groupActions}
        ></Section>
      </div>
    )
  }

}


ReactDOM.render(<App/>, document.getElementById('main'));
