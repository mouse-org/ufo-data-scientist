const React = require('react');

const CleanData = require('./CleanData');

//const Section = function(props) {

class Section extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {

    var currentSection = null;
    if (this.props.currentSection === 'CleanData') {

      let validShapes = [];
      let duplicateShapes = [];
      this.props.shapeSets.map((shape, index) => {
        shape.index = index;
        if (shape.duplicate) {
          duplicateShapes.push(shape);
        } else {
          //console.log(shape.shape);
          validShapes.push(shape);
        }
      });




      var currentSection =
          <CleanData
            validShapes={validShapes}
            duplicateShapes={duplicateShapes}
            moveShape={this.props.moveShape}
            setActions={this.props.setActions}
            pointActions={this.props.pointActions}
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
