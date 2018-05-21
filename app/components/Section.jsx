const React = require('react');
const CleanData = require('./CleanData');

class Section extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    var currentSection = null;
    if (this.props.currentSection === 'CleanData') {

      var currentSection =
          <CleanData
            dataGroups={this.props.shapeDataGroups}
            groupActions={this.props.groupActions.CleanData}

            moveDataPoint={this.props.moveDataPoint}
            onDataGroupNameChange={this.props.onDataGroupNameChange}
            toggleEditGroupName={this.props.toggleEditGroupName}
            removeDataGroup={this.props.removeDataGroup}
            toggleCollapse={this.props.toggleCollapse}
          ></CleanData>
    }


    return (
      <div className="section">
        {currentSection}
      </div>
    );
  }
}

module.exports = Section;
