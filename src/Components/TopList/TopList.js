import React, {Component} from 'react';
import Slider from './Slider';
import DonutPlot from '../Plot/DonutPlot';
import dataFormatUtil from '../../utils/dataFormatUtil';
import update from 'immutability-helper';

class TopList extends Component{
  constructor(){
    super();
    this.state = {
      data : []
    }
    this.update = this.update.bind(this);
  }
  update(data){
    this.setState(prevState => {
      return update(prevState, {
        data : {$set : data}
      });
    });
  }
  render(){

    const data = this.state.data;
    return (
          <div className="toplist-wrapper">
              <div className="row">
                <Slider update={this.update} cacheName={this.props.cacheName}></Slider>
              </div>
              <div className="row">
                <div className="col s12">
                  {data.length > 0 && <DonutPlot data={data}></DonutPlot>}
                </div>
              </div>
          </div>
    );
  }
}

export default TopList;
