import React, { Component } from 'react';
import C3Chart from 'react-c3js';
import 'c3/c3.css';

import dataFormatUtil from '../../utils/dataFormatUtil';

class LinePlot extends Component{
  render(){
    const axisOptions = {
      x: {
        type: 'timeseries',
        tick: {
            format: '%m-%d'
        },
        label : 'Date'
      },
      y : {
        label : 'Values'
      }
    }
    const legendOptions = {
      show : true
    }
    const zoomOptions = {
      enabled: true
    }
    const lineOptions = {
        connectNull: true
    }
    if(this.props.hasOwnProperty('data')){ //TODO: Store on load????
      const data = dataFormatUtil.toLineData(this.props.data);
      return (
        <div className="lineplot-wrapper">
          <C3Chart data={data} axis={axisOptions} legend={legendOptions} zoom={zoomOptions} line={lineOptions}/>
        </div>
      );
    }
    else {
      return null;
    }

  }

}
export default LinePlot;
