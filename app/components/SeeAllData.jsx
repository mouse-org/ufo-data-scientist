  const React = require('react');

function SeeAllData(props) {

  const breakApartData = require('../helpers/breakApartData');

  const stateData = breakApartData(props.data, "state", "sightings");
  const durationData = breakApartData(props.data, "duration_minutes", "sightings");
  const latData = breakApartData(props.data, "city_latitude", "sightings");
  const longData = breakApartData(props.data, "city_longitude", "sightings");

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

  var lats = latData.map((lat, index) => {
    return (
      <li>
        {lat.city_latitude}<br/>
        {lat.sightings}<br/>
      </li>
    )
  });

  var longs = longData.map((long, index) => {
    return (
      <li>
        {long.city_longitude}<br/>
        {long.sightings}<br/>
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

      <ol>
        {lats}
      </ol>

      <ol>
        {longs}
      </ol>

    </div>
  );
}

module.exports = SeeAllData;
