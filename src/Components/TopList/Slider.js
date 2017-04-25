import React, {Component} from 'react';
import {handleReq, generateReq} from '../../utils/requestUtil';

class Slider extends Component{
  constructor(){
    super();
    this.state = {
      days : 1
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(ev){
    const days = ev.target.value;
    this.setState({days : days});
    this.update(days);

  }
  componentDidMount(){
    this.update(this.state.days);
  }
  update(days){
    const cacheName = this.props.cacheName;
    const req = generateReq(cacheName, 'top', {days : days});
    handleReq(req.url, req.options, (json, err) => {
      if(err)
        console.error(err);
      else {
        this.props.update(json);
      }
    });
  }
  render(){
    return (
      <div className="slider-wrapper">
        <div className="range-field col s3">
          <input type="range" id="days" min="1" max="7" value={this.state.days} onChange={this.handleChange}/>
          <label htmlFor="days" className="active">DAYS</label>
        </div>
      </div>
    );
  }
}

export default Slider;
