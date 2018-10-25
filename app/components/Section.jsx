const React = require('react');
const CleanData = require('./CleanData');
const DataViz = require('./DataViz');

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
      <DataViz
        dataGroups={props.shapeDataGroups}
        chartType={props.chartType}
        onChartTypeChange={props.onChartTypeChange}
      >
      </DataViz>
  }


  return (
    <div className="section">
      {currentSection}
    </div>
  );
}


module.exports = Section;
