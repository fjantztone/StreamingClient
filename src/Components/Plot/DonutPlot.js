import React, { Component } from 'react';
import C3Chart from 'react-c3js';
import 'c3/c3.css';
import dataFormatUtil from '../../utils/dataFormatUtil';

class DonutPlot extends Component{
  render(){
    const options = {
      legend : {
        show : false
      }
    }
    const donutOptions = {
      label : {
        format : (value,ratio,id) => {
          return value.toString();
        }
      }
    }
    const data = this.props.data;
    const rangeData = dataFormatUtil.toRangeData(data, 'donut');
    return (
      <div className="donutplot-wrapper">
          <C3Chart data={rangeData} donut={donutOptions} legend={options.legend} unloadBeforeLoad={true}/>
      </div>
    );
  }

}
export default DonutPlot;
