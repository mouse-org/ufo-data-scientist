const React = require('react')
//const ReactDOM = require('react-dom')
//const uuidv4 = require('uuid/v4')

const data = require('../newData')
const dataLength = data.length

/* Helpers */
const processDataForChart = require('../helpers/processDataForChart')

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

const dataStructures = require('../helpers/dataStructures')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.whichChartData = this.whichChartData.bind(this)
    this.processDataForChart = processDataForChart.bind(this, data)
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
      chartData: [[]]
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
    this.processDataForChart()
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
    }, this.processDataForChart)
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
    }, this.processDataForChart)
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
      
    }, this.processDataForChart)
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
    }, this.processDataForChart)
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
    }, this.processDataForChart)
  }

  onEnableSecondDataset(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      secondaryDataProperty: value
    })
  }

  render() {

    var chart = <div><h3>Error: No Chart</h3></div>

    if (this.state.chartType === 'bar') {
      chart = (
        <BarChart
          data={this.state.chartData[0]}
        />
      )
    } else if (this.state.chartType === 'line') {
      chart = (
        <LineChart
          data={this.state.chartData}
          secondDataset={this.state.secondaryDataProperty}
        />
      )
    }


    var secondDatasetOptions
    if (this.showSecondDatasetControls(this.state.chartType)) {
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
