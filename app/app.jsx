const React = require('react')
const ReactDOM = require('react-dom')
//const uuidv4 = require('uuid/v4')

const data = require('./newData')
const dataLength = data.length

/* Helpers */
const extractDataForSelectedProperty = require('./helpers/extractDataForSelectedProperty')
const vectorsFromSetAndValues = require('./helpers/vectorsFromSetAndValues')
const groupData = require('./helpers/groupData')
const settings = require('./helpers/settings')
const maxNumberZoom = settings.maxNumberZoom

/* Components */
const SelectDataProperty = require('./components/SelectDataProperty')
const DataPropertyControls = require('./components/DataPropertyControls')
const BarChart = require('./components/BarChart')

const datePartOptions = require('./helpers/datePartOptions')
const dataStructures = require('./helpers/dataStructures')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.processDataForChart = this.processDataForChart.bind(this)
    this.onDataPropertyChanged = this.onDataPropertyChanged.bind(this)
    this.onRangeMaxChanged = this.onRangeMaxChanged.bind(this)
    this.onRangeMinChanged = this.onRangeMinChanged.bind(this)
    this.onNumberZoomChanged = this.onNumberZoomChanged.bind(this)
    this.onDatePartChanged = this.onDatePartChanged.bind(this)
    this.state = {
      title: "UFO Data Scientist",
      dataPropertyIndex: 5,
      min: 0,
      max: 50,
      rangeMin: false,
      rangeMax: false,
      numberZoom: data.length > 10 ?
                    10 :
                    (
                      data.length > maxNumberZoom ?
                      maxNumberZoom :
                      data.length
                    ),
      datePartIndex: 0,
      chartData: []
    }
  }

  componentDidMount() {
    this.processDataForChart()
  }

  dataType(dataPropertyIndex) {
    return dataStructures[dataPropertyIndex].type
  }

  datePart(datePartIndex) {
    return datePartOptions[datePartIndex]
  }


  processDataForChart() {
    const dataPropertyIndex = this.state.dataPropertyIndex
    const dataType = this.dataType(dataPropertyIndex)
    const datePartIndex = this.state.datePartIndex
    const datePart = this.datePart(datePartIndex)
    const numberZoom = this.state.numberZoom
    var rangeMin = this.state.rangeMin
    var rangeMax = this.state.rangeMax

    const selectedData = extractDataForSelectedProperty(data, dataPropertyIndex, dataType, datePart)

    // Unique values from selectedData
    console.log("DP")
    console.log(dataStructures[dataPropertyIndex])
    const excludedValue = dataStructures[dataPropertyIndex].exclude
    console.log("APP: EV: ", excludedValue, typeof excludedValue)
    var selectedSet = [...new Set(selectedData)]

    console.log("SS:", selectedSet)

    // Turn array of values into vectors with values and frequency
    const vectors = vectorsFromSetAndValues(
      selectedData, selectedSet, excludedValue, dataType, datePart.name
    )

    console.log("V:", vectors)

    // If excludedValue is included in vectors then remove it:
    var groupableVectors = vectors
    var excluded = null
    if (vectors[0] && vectors[0].name === excludedValue) {
      groupableVectors = vectors.slice(1, vectors.length)
      excluded = vectors.slice(0, 1)[0].value
    }

    console.log("GV:", groupableVectors)

    var chartData
    var absMin = groupableVectors[0].name
    var absMax = groupableVectors[groupableVectors.length - 1].name
    if (dataType === 'number') {
      absMin = Math.floor(absMin)
      absMax = Math.ceil(absMax)

      if (!rangeMin) { rangeMin = absMin }
      if (!rangeMax) { rangeMax = absMax }

      chartData = groupData(
        groupableVectors, numberZoom, rangeMin, rangeMax
      );
    //} else if (dataType === 'datetime') {
      // 🚸 Maybe in the future will group date data
      // Date/Time Data Sets: date_time)
     //return this.groupData(sortedData, 'string', groups)
    } else {
      chartData = groupableVectors
    }

    console.log("Abs MINMAX:", absMin, absMax)   

    // Need to extract value above and add in 'Unknown'
    // here because of different excluded values in data
    if (excluded) {
      chartData.push({name: 'Unknown', value: excluded})
    }

    console.log("CHART DATA:", chartData)

    var newState = {
      min: absMin,
      max: absMax,
      rangeMin: rangeMin,
      rangeMax: rangeMax,
      chartData: chartData
    }

    this.setState(newState)
  }

  onDataPropertyChanged(event) {
    this.setState(
      {
        dataPropertyIndex: event.currentTarget.value,
        rangeMin: false,
        rangeMax: false
      }, this.processDataForChart
    )
  }

  onRangeMaxChanged(e) {
    const updatedMax = parseFloat(e.target.value)
    
    this.setState((state, props) => {
      if (updatedMax <= state.rangeMin) { return {} }
      return {
        rangeMax: updatedMax
      }
    }, this.processDataForChart)
  }

  onRangeMinChanged(e) {
    const updatedMin = parseFloat(e.target.value)
    this.setState((state, props) => {
      if (updatedMin >= state.rangeMax) { return {} }
      return {
        rangeMin: updatedMin
      }
    }, this.processDataForChart)
  }
  onNumberZoomChanged(e) {
    var zoom = e.target.value;
    zoom = zoom > maxNumberZoom ? maxNumberZoom : zoom;
    this.setState({
      numberZoom: zoom
    }, this.processDataForChart)
  }

  onDatePartChanged(e) {
    const index = e.currentTarget.value
    this.setState({
      datePart: datePartOptions[index]
    }, this.processDataForChart)
  }

  render() {

    return (
      <div id="app">
        <h1>{this.state.title}</h1>

        <p>Dataset Min: {this.state.rangeMin}</p>
        <p>Dataset Max: {this.state.rangeMax}</p>

        <SelectDataProperty
          onDataPropertyChanged={this.onDataPropertyChanged}
          dataPropertyIndex={this.state.dataPropertyIndex}
        />

        <DataPropertyControls
          dataPropertyIndex = {this.state.dataPropertyIndex}

          // Number
          rangeMin={this.state.rangeMin}
          rangeMax={this.state.rangeMax}
          min={this.state.min}
          max={this.state.max}
          onRangeMaxChanged={this.onRangeMaxChanged}
          onRangeMinChanged={this.onRangeMinChanged}
          dataLength={dataLength}
          numberZoom={this.state.numberZoom}
          onNumberZoomChanged={this.onNumberZoomChanged}

          // DateTime
          datePart = {this.datePart(this.state.datePartIndex).name}
          onDatePartChanged={this.onDatePartChanged}
        />

        <h3>Data:</h3>

        <BarChart
          data={this.state.chartData}
          number={this.isNumber}
        />

      </div>
    )
  }

}


ReactDOM.render(<App/>, document.getElementById('main'));
