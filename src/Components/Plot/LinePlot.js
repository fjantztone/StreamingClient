import React, { Component } from 'react';
import C3Chart from 'react-c3js';
import 'c3/c3.css';

import dataFormatUtil from '../../utils/dataFormatUtil';

class LinePlot extends Component{
  render(){
    const options = {
      axis : {
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
      },
      legend : {
        show : true
      },
      zoom : {
        enabled: true
      },
      line : {
          connectNull: true
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

    if(this.props.hasOwnProperty('data')){ //TODO: Store on load????
      const data = dataFormatUtil.toLineData(this.props.data);
      console.log(JSON.stringify(data, null, 2));
      return (
        <div className="lineplot-wrapper">
          <C3Chart data={data} axis={options.axis} legend={options.legend} zoom={options.zoom} line={options.line} padding={options.padding} grid={options.grid} unloadBeforeLoad={true}/>
        </div>
      );
    }
    else {
      return null;
    }

  }

}
export default LinePlot;
