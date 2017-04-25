import React, {Component} from 'react';
import DataList from './DataList';
import './DataFinder.css';
import DataSearchForm from './DataSearchForm';


class DataFinder extends Component{ //dataexplorer?

  render(){
    return (
      <div>
        <div className={"row white " + (this.props.visible ? 'show' : 'hide')}>
          <div className="row"></div>
          <div className="col s6">
            <DataSearchForm attributes={this.props.attributes} cacheName={this.props.cacheName} setData={this.props.setData}></DataSearchForm>
          </div>
          <div className="col s6">
            <DataList data={this.props.data} removeData={this.props.removeData}></DataList>
          </div>
        </div>
      </div>
    );
  }
}

export default DataFinder;
