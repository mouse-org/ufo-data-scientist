const testds = [
  {
    name: "state",
    type: "string",
    exclude: "Unknown"
  },
  {
    name: "date_time",
    type: "datetime",
    exclude: "Unknown" // None in data
  },
  {
    name: "duration_minutes",
    type: "number",
    exclude: "Unknown"
  }
]

const ds = [
  {
    name: "state",
    type: "string",
    exclude: "Unknown"
  },
  {
    name: "date_time",
    type: "datetime",
    exclude: "Unknown" // None in data
  },
  {
    name: "shape",
    type: "string",
    exclude: "unknown" // SIC (lowercase)
  },
  {
    name: "duration_minutes",
    type: "number",
    exclude: "Unknown"
  },
  {
    name: "city_latitude",
    type: "number",
    exclude: "Unknown"
  },
  {
    name: "city_longitude",
    type: "number",
    exclude: "Unknown"
  }
]

module.exports = ds