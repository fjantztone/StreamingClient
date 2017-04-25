import React, { Component } from 'react';
import C3Chart from 'react-c3js';
import 'c3/c3.css';
import dataFormatUtil from '../../utils/dataFormatUtil';

class CategoryBarPlot extends Component{
  render(){
    const data = this.props.data;
    const options = {
      axis: {
        rotated: true,
        x: {
          type: 'category',
          tick:{
            multiline: false
          }
        }
      },
      legend: {
        show: false
      },
      tooltip: {
        show: false
      },
      bar : {
        width: {
            ratio: 0.65
        }
      }
    }
    const categoryData = dataFormatUtil.toCategoryData(data);
    return (
      <div className="categoryplot-wrapper">
          <C3Chart data={categoryData} axis={options.axis} legend={options.legend} tooltip={options.tooltip} bar={options.bar}/>
      </div>
    );


  }

}
export default CategoryBarPlot;
