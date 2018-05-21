const React = require('react');
var dragula = require('react-dragula');

const ShapeDataGroup = require('./ShapeDataGroup');

class CleanData extends React.Component {
  constructor(props) {
    super(props);
    this.addDragContainer = this.addDragContainer.bind(this);
    this.state = {
      drake: dragula({
        revertOnSpill: true
      })
    }
  }

  // Enables Dragula for each dataGroup
  addDragContainer(cont) {
    this.state.drake.containers.push(cont);
  }

  componentDidMount() {
    var draggedSource;    // 🚸
    var drake = this.state.drake;
    drake
    .on('drop', (el, target, source, sibling) => {
      drake.cancel();
      this.moveDataShape(el, target, source, sibling)
    })
  }

  moveDataShape(el, target, source, sibling) {
    var drake = this.state.drake;
    var nextShape = false;     // 🚸
    if (sibling) {
      nextShape = sibling.id;
    }
    this.props.moveDataPoint(el.id, target.id, source.id, nextShape);
    drake.remove();
  }

  render() {
    var groupActions = this.props.groupActions.map((action, index) => {

      var textIndex;
      if (action.toggle) {
        textIndex = 1;
      } else {
        textIndex = 0;
      }

      return (
        <li key={index}>
          {index}:
          <button onClick={() => action.action(index, action.toggle)}>
            {action.text[textIndex]}
          </button>
        </li>
      )
    });


    const dataGroupItems = this.props.dataGroups.map((dataGroup, index) =>
        <ShapeDataGroup
          key={index}
          index={index}
          dataGroup={dataGroup}
          addDragContainer={this.addDragContainer}
          onDataGroupNameChange={this.props.onDataGroupNameChange}
          toggleEditGroupName={this.props.toggleEditGroupName}
        ></ShapeDataGroup>
    );

    return (
      <div id="clean-data">
        <ul className="actions">
          {groupActions}
        </ul>
        <div id='data-group-list' className='data-group-list'>
          <h3>Shapes:</h3>
          <ul
            id='shapes'
            className='container'
          >
            {dataGroupItems}
          </ul>
        </div>
      </div>
    );
  }
}

module.exports = CleanData;
