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
            moveDataPoint={this.props.moveDataPoint}
            groupActions={this.props.groupActions.CleanData}
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
