const React = require('react');

function SeeAllData(props) {

  const breakApartData = require('../helpers/breakApartData');

  const stateData = breakApartData(props.data, "state", "sightings");

  var states = stateData.map((state, index) => {
    return (
      <li>
        {state.state}<br/>
        {state.sightings}<br/>
      </li>
    )
  });


  return (
    <div id="see-all-data">
      <h1>See All Data</h1>

      <ol>
        {states}
      </ol>

    </div>
  );
}

module.exports = SeeAllData;
