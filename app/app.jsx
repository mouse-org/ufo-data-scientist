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
    this.toggleDuplicate = this.toggleDuplicate.bind(this);
    this.moveShape = this.moveShape.bind(this);

    const ufoDataMap = data.ufoShapes.map(shape => {
      return {
        dataPointId: uuidv4(),
        dataPointName: shape.shape,
        totalSightings: shape.sightings,
        shapes: [Object.assign({}, {shapeId: uuidv4()}, shape)]
      }
    });

    this.state = {
      title: "UFO Data Scientist",
      data: {
        shapeSets: ufoDataMap
      },
      currentSection: "CleanData",
      setActions: {
        CleanData: [
          {
            text: "A - Z",
            action: this.sort.bind(null, "shape")
          },
          {
            text: "📈",
            action: this.sort.bind(null, "sightings")
          }
        ]
      },
      pointActions: {
        CleanData: [
          {
            enabledText: '🔵',
            notEnabledText: '◻️',
            action: this.toggleDuplicate
          }
        ]
      }
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
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
      const newOrder = prevState.data.shapes.sort(this.compare.bind(null, prop));
      let newData = prevState.data;
      newData.shapes = newOrder;

      return {
      data: newData
      }
    });

  }

  toggleDuplicate(index) {
    this.setState((prevState, props) => {
      let data = prevState.data;
      if (data.shapes[index].duplicate) {
        data.shapes[index].duplicate = false;
      } else {
        data.shapes[index].duplicate = true;
      }
      return {
        data: data
      }
    });
  }

  moveShape(shapeId, droppedIntoDataPointId, sourceDataPointId) {
    console.log(shapeId);
    console.log(droppedIntoDataPointId);
    console.log(sourceDataPointId);
    this.setState((prevState, props) => {
      var newData = prevState.data;
      var movedToSet = false;
      var sourceSet = false;
      var movedShape;
      for (var i = 0; i < newData.shapeSets.length; i++) {
        var set = newData.shapeSets[i];
        if (set.dataPointId === sourceDataPointId) {
          sourceSet = set;
          for (var j = 0; j < set.shapes.length; j++) {
            var shape = set.shapes[j];
            if (shape.shapeId === shapeId) {
              movedShape = shape;
              set.shapes.splice(j, 1);
              break;
            }
          }
        }
        if (set.dataPointId === droppedIntoDataPointId) {
          movedToSet = set;
        }
        if (sourceSet && movedToSet) {
          break;
        }
      }

      movedToSet.shapes.push(movedShape);

      return {
        data: newData
      }
    });
  }



  render() {

    let setActions = [];
    let pointActions = [];
    if (this.state.currentSection === "CleanData") {
      setActions = this.state.setActions.CleanData;
      pointActions = this.state.pointActions.CleanData;
    }


    return (
      <div id="app">
        <h1>{this.state.title}</h1>
        <Section
          shapeSets={this.state.data.shapeSets}
          setActions={setActions}
          pointActions={pointActions}
          moveShape={this.moveShape}
          currentSection={this.state.currentSection}
        ></Section>
      </div>
    )
  }

}


ReactDOM.render(<App/>, document.getElementById('main'));
