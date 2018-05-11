const React = require('react');
var dragula = require('react-dragula');

class ShapeDataPoint extends React.Component {
  constructor(props) {
    super(props);
  }
  
  
  render() {
    console.log(this.props.shapeList);
    
    /*
    const pointActions = this.props.pointActions.map((action, index) => {
      if (this.props.shape.duplicate) {
        return(
          <li>
            <button onClick={(e) => {action.action(this.props.shape.index)}}>
              {action.enabledText}
            </button>
          </li>
        )
      } else {
        return (
          <li>
            <button onClick={(e) => {action.action(this.props.shape.index)}}>
              {action.notEnabledText}
            </button>
          </li>
        )
      }

    }); 
    */

    return (
      <ul
        className="sighting-data"
      >
        <li><strong>Sighting</strong></li>
        <li>{this.props.shape.shapeId}</li>
        <li>Name: {this.props.shape.shape}</li>
        <li>Sightings: {this.props.shape.sightings}</li>
        <br/>
      </ul>   
      
    );
  }
}

module.exports = ShapeDataPoint;



