import React, { Component } from 'react';
import C3Chart from 'react-c3js';
import 'c3/c3.css';
import dataFormatUtil from '../../utils/dataFormatUtil';

class BarPlot extends Component{
  render(){
    const legendOptions = {
      show : false
    }
    const data = this.props.data;
    const rangeData = dataFormatUtil.toRangeData(data, 'donut');

    return (
      <div className="barplot-wrapper">
          <C3Chart data={rangeData} legend={legendOptions}/>
      </div>
    );


  }

}
export default BarPlot;
