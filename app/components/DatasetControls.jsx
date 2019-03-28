const React = require('react');

function DatasetControls(props) {

  const controlStyle = {
    border: '1px dashed purple',
    padding: '10px',
    margin: '10px'
  }

  return (
    <div className="dataset-control" style={controlStyle} >
      <h2>Dataset Controls:</h2>

    </div>
  );
}


module.exports = DatasetControls;