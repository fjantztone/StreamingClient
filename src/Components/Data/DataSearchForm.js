import React, {Component} from 'react';
import ReactMaterialSelect from 'react-material-select'
import 'react-material-select/lib/css/reactMaterialSelect.css'

import update from 'immutability-helper';
import { generateReq, handleReq, removeProps } from '../../utils/requestUtil';

class DataSearchForm extends Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dateDisabled : false,
      formData: {}
    }

  }
  toggle(name){
    this.setState(prevState => ({[name] : !prevState[name]}));
  }
  handleChange(ev){
    const name = ev.target.name;
    const value = ev.target.value;

    this.setState(prevState => {
      return update(prevState, {formData : {$merge : {[name] : value}}});
    });
  }
  handleSelect(selected){
    const value = selected.value;
    let disabled = (value === 'subscribe');

    this.setState(prevState => {
      return update(prevState, {
        formData : {$merge : {filter : value}},
        dateDisabled : {$set : disabled}
      });
    });
  }

  handleSubmit(ev){
    ev.preventDefault();
    let formData = Object.assign({}, this.state.formData);
    const cacheName = this.props.cacheName;
    const filter = formData.filter;

    if(filter === 'subscribe'){
      let key = removeProps(formData, ['filter', 'startDate', 'endDate']);
      const obj = {
        key : key,
        value : 0
      }
      this.props.setData([[obj]], filter);
    }
    if(filter === 'points' || filter === 'range'){

      const req = generateReq(cacheName, filter, formData);
      handleReq(req.url, req.options, (res, err) => {
        if(err)
          console.error(err);
        else{
          this.props.setData([res], filter);
        }
      });

    }



  }

  render(){
    const attributes = this.props.attributes;
    let inputFields = attributes.map((attribute, index) => {
      return  <div className="row" key={index}>
                <div className="input-field col s12">
                  <input id={attribute} name={attribute} type="text" onChange={this.handleChange} />
                  <label htmlFor={attribute} className="active">{attribute}</label>
                </div>
              </div>;
    });

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col s12">
            <ReactMaterialSelect label="Choose action" resetLabel="" defaultValue="" onChange={this.handleSelect}>
              <option dataValue="points">Point query</option>
              <option dataValue="range">Range query</option>
              <option dataValue="subscribe">Subscribe</option>
            </ReactMaterialSelect>
          </div>
          <div className="input-field col s6">
            <input required="true" disabled={this.state.dateDisabled} placeholder="YYYY-MM-DD" id="STARTDATE" name="startDate" type="text" onChange={this.handleChange} />
            <label required="true" htmlFor="STARTDATE" className="active" >STARTDATE</label>
          </div>
          <div className="input-field col s6">
            <input disabled={this.state.dateDisabled} placeholder="YYYY-MM-DD" id="ENDDATE" name="endDate" type="text" onChange={this.handleChange} />
            <label htmlFor="ENDDATE" className="active">ENDDATE</label>
          </div>
        </div>
        {inputFields}
        <div className="row">
          <div className="col s6">
            <button className="waves-effect waves-light btn">ADD</button>
          </div>
        </div>
      </form>
    );
  }
}

export default DataSearchForm;
