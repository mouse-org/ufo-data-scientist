const React = require('react');

function SeeAllData(props) {

  const breakApartData = require('../helpers/breakApartData');

  const stateData = breakApartData(props.data, "state", "sightings");
  const durationData = breakApartData(props.data, "duration_minutes", "sightings");

  var states = stateData.map((state, index) => {
    return (
      <li>
        {state.state}<br/>
        {state.sightings}<br/>
      </li>
    )
  });

  var durations = durationData.map((duration, index) => {
    return (
      <li>
        {duration.duration_minutes}<br/>
        {duration.sightings}<br/>
      </li>
    )
  });


  return (
    <div id="see-all-data">
      <h1>See All Data</h1>

      <ol>
        {states}
      </ol>

      <ol>
        {durations}
      </ol>

    </div>
  );
}

module.exports = SeeAllData;
