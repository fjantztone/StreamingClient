import React, {Component} from 'react';
import WS from './WS';
import CategoryBarPlot from '../Plot/CategoryBarPlot';
import update from 'immutability-helper';

class SubscribeList extends Component{
  constructor(){
    super();
    this.state = {
      data : []
    }
    this.update = this.update.bind(this);
  }
  update(key, value){
    const keys = this.state.data.map(item => JSON.stringify(item.key));
    const index = keys.indexOf(JSON.stringify(key));

    if(index !== -1){
      this.setState(prevState => {
        return update(prevState, {
          data : {[index] : {value : {$set : value}}}
        });
      });
    }
    else{
      let params = {
        key : key,
        value : value
      }
      this.setState(prevState => {
        return update(prevState, {
          data : {$push : [params]}
        });
      });
    }

  }
  render(){
    const propData = this.props.data;
    const stateData = this.state.data;
    const keys = propData.map(item => JSON.stringify(item[0].key));

    return (
      <div className="subscribelist-wrapper">
        {keys.length > 0 && <WS keys={keys} update={this.update}></WS>}
        {stateData.length > 0 && <CategoryBarPlot data={stateData}/>}
      </div>
    );
  }
}

export default SubscribeList;
