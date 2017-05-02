import React, { Component } from 'react';
import C3Chart from 'react-c3js';
import 'c3/c3.css';

import dataFormatUtil from '../../utils/dataFormatUtil';

class TickPlot extends Component{
  constructor(){
    super();
    this.startData = {
      x: 'dates',
      columns : []
    }
    this.options = {
      axis : {
        x: {
          type: 'timeseries',
          tick: {
              format: '%H:%M:%S'

          },
          label : 'Time'
        },
        y : {
          label : 'Values'
        }
      },
      legend : {
        show : true
      },
      zoom : {
        enabled: true
      },
      line : {
          connectNull: true,
          step: {
            type: 'step-after'
          }
      },
      padding : {
        right : 25
      },
      grid : {
        x : {
          show : true
        }
      }
    }
  }
  flowTo(data){
    const chart = this.chart.chart;
    const flowData = dataFormatUtil.toFlowData(data);
    chart.flow(flowData);
  }
  componentWillReceiveProps(nextProps){
    this.flowTo(nextProps.data);
  }
  componentDidMount(){
    this.flowTo(this.props.data);
  }

  render(){
    return (
      <div className="lineplot-wrapper">
        <C3Chart data={this.startData} axis={this.options.axis} legend={this.options.legend} zoom={this.options.zoom} line={this.options.line} padding={this.options.padding} grid={this.options.grid} ref={(chart) => {this.chart = chart;}}/>
      </div>
    );

  }

}
export default TickPlot;
