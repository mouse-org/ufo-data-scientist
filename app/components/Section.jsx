const React = require('react');
const CleanData = require('./CleanData');

function Section(props) {
  var currentSection = null;
  if (props.currentSection === 'CleanData') {

    currentSection =
        <CleanData
          dataGroups={props.shapeDataGroups}
          groupActions={props.groupActions.CleanData}

          moveDataPoint={props.moveDataPoint}
          onDataGroupNameChange={props.onDataGroupNameChange}
          toggleEditGroupName={props.toggleEditGroupName}
          removeDataGroup={props.removeDataGroup}
          toggleCollapse={props.toggleCollapse}
          newDataGroup={props.newDataGroup}
        ></CleanData>
  }

  if (props.currentSection === 'DataViz') {

    currentSection =
      <h1>{props.currentSection}</h1>
  }


  return (
    <div className="section">
      {currentSection}
    </div>
  );
}


module.exports = Section;
