  const React = require('react');

function SeeAllData(props) {

  const breakApartData = require('../helpers/breakApartData');
  const dateTimeRounding = require('../helpers/dateTime').rounding;

  const stateData = [] //breakApartData(props.data, "state", "sightings", false);
  const dateTimeData = breakApartData(props.data, "date_time", "sightings", dateTimeRounding.bind(null, "MM"));
  const shapeData = []//breakApartData(props.data, "shape", "sightings", false);
  const durationData = []//breakApartData(props.data, "duration_minutes", "sightings", false);
  const latData = []//breakApartData(props.data, "city_latitude", "sightings", false);
  const longData = []//breakApartData(props.data, "city_longitude", "sightings", false);

  var states = stateData.map((state, index) => {
    return (
      <li>
        {state.state}<br/>
        {state.sightings}<br/>
      </li>
    )
  });

  console.log(dateTimeData)
  for (var i in dateTimeData) {
    console.log(i)
    console.log(dateTimeData[i]);
    console.log("");
  }
  //const dateTimeDataSorted;
  var dateTime = dateTimeData.map((dateTime, index) => {
    return (
      <li>
        Time Period: {dateTime.date_time}<br/>
        Sightings: {dateTime.sightings}<br/>
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
        <h3>States:</h3>
        {states}
      </ol>
      <ol>
        <h3>Datetime:</h3>
        {dateTime}
      </ol>
      <ol>
        <h3>Durations</h3>
        {durations}
      </ol>
      <ol>
        <h3>Latitudes:</h3>
        {lats}
      </ol>
      <ol>
        <h3>Longitudes:</h3>
        {longs}
      </ol>

    </div>
  );
}

module.exports = SeeAllData;
