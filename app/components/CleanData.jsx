const React = require('react');
var dragula = require('react-dragula');

const ShapeList = require('./ShapeList');

//const CleanData = function(props) {

class CleanData extends React.Component {
  constructor(props) {
    super(props);
    this.addDragContainer = this.addDragContainer.bind(this);
    this.state = {
      drake: dragula({
        revertOnSpill: true
      })
      .on('drop', (el, cont) => {
        this.props.moveShape(el.id, cont.id);
      })
    }
  }
  
  addDragContainer(cont) {
    console.log("adding!");
    this.state.drake.containers.push(cont);
  }

  componentDidMount() {
    console.log("Mounting!");
  }
  
  render() {  

    const setActions = this.props.setActions.map((action, index) => 
      <li key={index}>
        {index}:
        <button onClick={action.action}>
          {action.text}
        </button>
      </li>
    );
    
    const validShapeListItems = this.props.validShapes.map((shapeContainer, index) => 
    
        <ShapeList
          key={index}
          shapeContainer={shapeContainer}
          addDragContainer={this.addDragContainer}
        ></ShapeList>
    );
    
    /*
        pointActions={this.props.pointActions}
        
    */
    
    
    /*
    const duplicateShapeListItems = this.props.duplicateShapes.map((shape, index) =>
      <ShapeDataPoint
        key={index}
        shape={shape}
        pointActions={this.props.pointActions}
      ></ShapeDataPoint>
    );
    */
                                                                   
    return (
      <div id="clean-data">
        <ul className="actions">     
          {setActions}
        </ul>
        <div id='valid-shapes-list' className='clean-data-list'>
          <h3>Valid Shapes:</h3>
          <ul
            id='valid-shapes'
            className='container'
            
          >
            {validShapeListItems}
          </ul>
        </div>
                                                                     
        {/*                                                             
        <div id='duplicate-shapes-list' className='clean-data-list'>
          <h3>Duplicate Shapes:</h3>
          <ul
            id='duplicate-shapes'
            className='container'    
          >
            {duplicateShapeListItems}       
          </ul>
        </div>
        */}
                                                                     
      </div>
    );
  }
}

module.exports = CleanData;