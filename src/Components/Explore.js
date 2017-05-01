import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import DataFinder from './Data/DataFinder';
import LinePlot from './Plot/LinePlot';
import CategoryBarPlot from './Plot/CategoryBarPlot';
import SubscribeList from './SubscribeList/SubscribeList';
import TopList from './TopList/TopList';
import {handleReq} from '../utils/requestUtil.js'
import update from 'immutability-helper';

const defaultState = {
  data : {
    points: [],
    range: [],
    subscribe: []
  },
  hideDataFinder : true,
  cache : {}
}
class Explore extends Component{
  constructor(props){
    super(props);
    this.state = defaultState;
    this.setData = this.setData.bind(this);
    this.removeData = this.removeData.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleDataFinder = this.toggleDataFinder.bind(this);
    this.baseurl = "http://localhost:8081/api/cache";
  }
  toggle(key){
    this.setState(prevState => ({[key] : !prevState[key]}));
  }
  toggleDataFinder(ev){
    this.toggle("hideDataFinder");
  }

  componentDidMount(){
    const history = new createHistory();
    const cacheName = this.props.match.params.cacheName;
    const url = this.baseurl + '/' + cacheName;
    const options = {
      method : 'GET'
    }

    handleReq(url, options, (res, err) => {
      if(err){
        console.error(err);
        return history.goBack();
      }
      else{
        const config = res;
        this.setState(prevState => {
          return update(prevState, {
              cache : {$set : config}
          });
        });
      }
    });

  }
  setData(data, filter){
    this.setState(prevState => {
      return update(prevState, {data : {[filter]: {$push : data}}});
    });
  }
  removeData(index, filter){
    this.setState(prevState => {
      return update(prevState, {
        data : {
          [filter] : {$splice : [[index,1]]}
        }
      });
    });
  }

  render(){
      const cache = this.state.cache;
      const data = this.state.data;
      return (
          <div>
            <div>
              <div className="fixed-action-btn horizontal click-to-toggle">
                <a className="btn-floating btn-large red">
                  <i className="material-icons">menu</i>
                </a>
                <ul>
                  <li><a className="btn-floating black" onClick={() => {this.toggle('hideDataFinder')}}><i className="material-icons">insert_chart</i></a></li>
                </ul>
              </div>
            </div>

            {Object.keys(cache).length && <DataFinder visible={!this.state.hideDataFinder} attributes={cache.attributes} cacheName={cache.name} setData={this.setData} removeData={this.removeData} data={this.state.data} toggleDataFinder={() => {this.toggle('hideDataFinder')}}></DataFinder>}
            <div className="row">
              {data.subscribe.length  > 0 && <div className="col s12"><div className="col-wrapper col s12 white"><div className="section"><h6>subscribed data</h6></div><div className="divider"></div><div className="section"><SubscribeList data={data.subscribe}></SubscribeList></div></div></div>}
            </div>
            <div className="row">
              {data.points.length > 0 && <div className="col s12"><div className="col-wrapper col s12 white"><div className="section"><h6>timeseries data</h6></div><div className="divider"></div><div className="section"><LinePlot data={data.points}></LinePlot></div></div></div>}
              </div>
            <div className="row">
              {data.range.length > 0 && <div className="col s7"><div className="col-wrapper col s12 white"><div className="section"><h6>range data</h6></div><div className="divider"></div><div className="section"><CategoryBarPlot data={data.range}></CategoryBarPlot></div></div></div>}
              {Object.keys(cache).length && <div className="col s5"><div className="col-wrapper col s12 white"><div className="section"><h6>top trends</h6></div><div className="divider"></div><div className="section"><TopList cacheName={cache.name}></TopList></div></div></div>}
            </div>


          </div>
        );



  }
}
export default Explore;
