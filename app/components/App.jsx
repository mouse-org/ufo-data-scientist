const React = require('react')
//const ReactDOM = require('react-dom')
//const uuidv4 = require('uuid/v4')

const data = require('../newData')
const dataLength = data.length

/* Helpers */
const extractDataForSelectedProperty = require('../helpers/extractDataForSelectedProperty')
const vectorsFromSetAndValues = require('../helpers/vectorsFromSetAndValues')
const groupData = require('../helpers/groupData')

const settings = require('../helpers/settings')
const maxNumberZoom = settings.maxNumberZoom
const defaultDataProperty = settings.defaultDataProperty
const defaultSecondDataProperty = settings.defaultSecondDataProperty
const defaultNumberZoom = require('../helpers/defaultNumberZoom')

/* Components */
const DatasetControls = require('./DatasetControls')
const ChartTypeControls = require('./ChartTypeControls')
const BarChart = require('./charts/BarChart')
const LineChart = require('./charts/LineChart')

const datePartOptions = require('../helpers/datePartOptions')
const dataStructures = require('../helpers/dataStructures')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.whichChartData = this.whichChartData.bind(this)
    this.processDataForChart = this.processDataForChart.bind(this)
    this.onChartTypeChanged = this.onChartTypeChanged.bind(this)
    this.onDataPropertyChanged = this.onDataPropertyChanged.bind(this)
    this.onRangeMaxChanged = this.onRangeMaxChanged.bind(this)
    this.onRangeMinChanged = this.onRangeMinChanged.bind(this)
    this.onNumberZoomChanged = this.onNumberZoomChanged.bind(this)
    this.onDatePartChanged = this.onDatePartChanged.bind(this)
    this.onEnableSecondDataset = this.onEnableSecondDataset.bind(this)
    this.state = {
      title: "UFO Data Scientist",
      chartType: 'bar',
      dataPropertyIndex: {
        primary: defaultDataProperty,
        secondary: defaultSecondDataProperty
      },
      secondaryDataProperty: false,
      datasetSettings: {
        primary: {
          [defaultDataProperty]: {
            datePartIndex: 0,
            min: false,
            max: false,
            absMin: 0,
            absMax: 50,
            numberZoom: defaultNumberZoom(dataLength, maxNumberZoom),
          }
        },
        secondary: {
          [defaultSecondDataProperty]: {
            datePartIndex: 0,
            min: false,
            max: false,
            absMin: 0,
            absMax: 50,
            numberZoom: defaultNumberZoom(dataLength, maxNumberZoom),
          }
        }
      },
      chartData: {
        primary: [],
        secondary: []
      }
    }
  }

  componentDidMount() {
    this.whichChartData()
  }

  dataType(dataPropertyIndex) {
    if (dataStructures[dataPropertyIndex]) {
      return dataStructures[dataPropertyIndex].type
    } else {
      return null
    }
  }

  showSecondDatasetControls(chartType) {
    switch(chartType) {
      case 'line':
        return true
        break
      default:
        return false
    }
  }

  whichChartData() {
    this.processDataForChart('primary')
    this.processDataForChart('secondary')
  }

  processDataForChart(dataset) {
    const dataPropertyIndex = this.state.dataPropertyIndex[dataset]
    const dataType = this.dataType(dataPropertyIndex)
    const datasetSettings = this.state.datasetSettings[dataset][dataPropertyIndex]

    const datePartIndex = datasetSettings.datePartIndex
    const datePart = datePartOptions[datePartIndex]
    const numberZoom = datasetSettings.numberZoom
    var rangeMin = datasetSettings.min
    var rangeMax = datasetSettings.max
    const chartType = this.state.chartType

    // Take values for selected property out of full data
    const selectedData = extractDataForSelectedProperty(
      data, dataPropertyIndex, dataType, datePart
    )

    // Unique values from selectedData
    const excludedValue = dataStructures[dataPropertyIndex].exclude
    var selectedSet = [...new Set(selectedData)]

    // Turn array of values into vectors with values and frequency
    const vectors = vectorsFromSetAndValues(
      selectedData, selectedSet, excludedValue, dataType, datePart.name
    )

    // If excludedValue is included in vectors then remove it:
    var groupableVectors = vectors
    var excluded = null
    if (vectors[0] && vectors[0].name === excludedValue) {
      groupableVectors = vectors.slice(1, vectors.length)
      excluded = vectors.slice(0, 1)[0].value
    }

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

    // Need to extract value above and add in 'Unknown'
    // here because of different excluded values in data
    if (excluded && (chartType === 'bar')) {
      chartData.push({name: 'Unknown', value: excluded})
    }

    //console.log("CHART DATA:", chartData)

    this.setState((state, props) => {
      var fullDatasetSettings = state.datasetSettings
      const currentDatasetSettings = fullDatasetSettings.primary[dataPropertyIndex]
      const updatedDatasetSettings = {
        min: rangeMin,
        max: rangeMax,
        absMin: absMin,
        absMax: absMax,
        numberZoom: numberZoom
      }

      fullDatasetSettings.primary[dataPropertyIndex] = Object.assign(
        {}, currentDatasetSettings, updatedDatasetSettings
      )

      var updatedChartData = state.chartData
      updatedChartData[dataset] = chartData

      console.log("UPDATED CHART DATA:", updatedChartData)

      var newState = {
        datasetSettings: fullDatasetSettings,
        chartData: updatedChartData
      }
      //console.log("## NS:", newState)
      return newState
    })
  }

  onChartTypeChanged(newChartType) {
    this.setState({
      chartType: newChartType
    }, this.whichChartData)
  }

  onDataPropertyChanged(dataset, event) {
    const newDataPropertyIndex = event.currentTarget.value
    this.setState((state, props) => {
      var dsSettings = state.datasetSettings[dataset]
      var newSettings = {}
      if (!dsSettings[newDataPropertyIndex]) {
        newSettings[newDataPropertyIndex] = {
          datePartIndex: 0,
          min: false,
          max: false,
          numberZoom: defaultNumberZoom(dataLength, maxNumberZoom)
        }
      }

      const updatedSettings = Object.assign(
        {}, dsSettings, newSettings
      )
      var updatedDatasetSettings = state.datasetSettings
      updatedDatasetSettings[dataset] = updatedSettings
      var updatedDataPropertyIndex = state.dataPropertyIndex
      updatedDataPropertyIndex[dataset] = newDataPropertyIndex

      const newState = {
        dataPropertyIndex: updatedDataPropertyIndex,
        datasetSettings: updatedDatasetSettings
      }

      return newState
    }, this.processDataForChart.bind(this, dataset))
  }

  onRangeMaxChanged(dataset, e) {
    const updatedMax = parseFloat(e.target.value)
    this.setState((state, props) => {
      var dataPropertyIndex = state.dataPropertyIndex[dataset]
      var newDatasetSettings = state.datasetSettings
      if (updatedMax <= newDatasetSettings[dataset][dataPropertyIndex].min) {
        return {}
      } else {
        newDatasetSettings[dataset][dataPropertyIndex].max = updatedMax
        return { datasetSettings: newDatasetSettings }
      }
    }, this.processDataForChart.bind(this, dataset))
  }

  onRangeMinChanged(dataset, e) {
    const updatedMin = parseFloat(e.target.value)
    this.setState((state, props) => {
      var dataPropertyIndex = state.dataPropertyIndex[dataset]
      var newDatasetSettings = state.datasetSettings
      if (updatedMin >= newDatasetSettings[dataset][dataPropertyIndex].max) {
        return {}
      } else {
        newDatasetSettings[dataset][dataPropertyIndex].min = updatedMin
        return { datasetSettings: newDatasetSettings }
      }
      
    }, this.processDataForChart.bind(this, dataset))
  }

  onNumberZoomChanged(dataset, e) {
    var zoom = e.target.value;
    zoom = zoom > maxNumberZoom ? maxNumberZoom : zoom;
    this.setState((state, props) => {
      var dataPropertyIndex = state.dataPropertyIndex[dataset]
      var newDatasetSettings = state.datasetSettings
      newDatasetSettings[dataset][dataPropertyIndex].numberZoom = zoom
      return {
        datasetSettings: newDatasetSettings
      }
    }, this.processDataForChart.bind(this, dataset))
  }

  onDatePartChanged(dataset, e) {
    const index = e.currentTarget.value
    this.setState((state, props) => {
      var datasetSettings = state.datasetSettings
      var dataPropertyIndex = state.dataPropertyIndex[dataset]
      datasetSettings[dataset][dataPropertyIndex].datePartIndex = index
      return {
        datasetSettings: datasetSettings
      }
    }, this.processDataForChart.bind(this, dataset))
  }

  onEnableSecondDataset(e) {
    const value = e.currentTarget.value
    this.setState({
      secondaryDataProperty: value
    })
  }

  render() {

    console.log("CD:", this.state.chartData)

    var chart = <div><h3>Error: No Chart</h3></div>

    if (this.state.chartType === 'bar') {
      chart = (
        <BarChart
          data={this.state.chartData.primary}
        />
      )
    } else if (this.state.chartType === 'line') {
      chart = (
        <LineChart
          data={this.state.chartData}
        />
      )
    }


    var secondDatasetOptions
    if (this.showSecondDatasetControls ) {
      var secondDatasetControls
      if (this.state.secondaryDataProperty) {
        secondDatasetControls = (
          <DatasetControls
            //index={0}
            type={'secondary'}
            chartType={this.state.chartType}
            dataPropertyIndex={this.state.dataPropertyIndex['secondary']}
            dataType={this.dataType(this.state.dataPropertyIndex.secondary)}
            onDataPropertyChanged={this.onDataPropertyChanged}
    
            // Number
            datasetSettings={this.state.datasetSettings.secondary[this.state.dataPropertyIndex.secondary]}
            onRangeMaxChanged={this.onRangeMaxChanged}
            onRangeMinChanged={this.onRangeMinChanged}
            dataLength={dataLength}
            onNumberZoomChanged={this.onNumberZoomChanged}
    
            // DateTime
            onDatePartChanged={this.onDatePartChanged}
          />
        )
      } 
      
      secondDatasetOptions = (
        <React.Fragment>
          <label>Second Dataset?</label>
          <input
            type="checkbox"
            checked={this.state.secondaryDataProperty}
            onChange={this.onEnableSecondDataset}
          />
          {secondDatasetControls}
        </React.Fragment>
      )
    }

    return (
      <div id="app">
        <h1>{this.state.title}</h1>

        <p>Chart Type: {this.state.chartType}</p>

        <ChartTypeControls
          chartType={this.state.chartType}
          onChartTypeChanged={this.onChartTypeChanged}
        />

        
        <DatasetControls
          // First dataset (all charts)
          //index={0}
          type={'primary'}
          chartType={this.state.chartType}
          dataPropertyIndex={this.state.dataPropertyIndex.primary}
          dataType={this.dataType(this.state.dataPropertyIndex.primary)}
          onDataPropertyChanged={this.onDataPropertyChanged /* 🦄 */}

          // Number
          datasetSettings={this.state.datasetSettings.primary[this.state.dataPropertyIndex.primary]}
          onRangeMaxChanged={this.onRangeMaxChanged}
          onRangeMinChanged={this.onRangeMinChanged}
          dataLength={dataLength}
          onNumberZoomChanged={this.onNumberZoomChanged}

          // DateTime
          onDatePartChanged={this.onDatePartChanged}
        />

        
        {secondDatasetOptions /* Second Dataset (line chart)*/}

        <h3>Data:</h3>

        <div id="chart-container">
          {chart}
        </div>

      </div>
    )
  }

}

module.exports = App
