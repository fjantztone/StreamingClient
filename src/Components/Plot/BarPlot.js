import React, { Component } from 'react';
import C3Chart from 'react-c3js';
import 'c3/c3.css';
import dataFormatUtil from '../../utils/dataFormatUtil';

class BarPlot extends Component{
  render(){
    const data = this.props.data;
    const barOptions = {
      width : {
        ratio : 0.5
      }
    };
    const legendOptions = {
      show : true
    }
    const axisOptions = {
      y : {
        label : 'Values'
      }
    }
    const rangeData = dataFormatUtil.toRangeData(data, 'bar');
    return (
      <div className="barplot-wrapper">
          <C3Chart data={rangeData} bar={barOptions} legend={legendOptions} axis={axisOptions}/>
      </div>
    );


  }

}
export default BarPlot;
