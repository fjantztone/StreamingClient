import React, {Component} from 'react';
import WS from './WS';
import TickPlot from '../Plot/TickPlot';
import update from 'immutability-helper';

class SubscribeList extends Component{
  constructor(){
    super();
    this.state = {
      data : {}
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
    const propData = this.props.data;
    const stateData = this.state.data;
    const keys = propData.map(item => JSON.stringify(item[0].key));

    return (
      <div className="subscribelist-wrapper">
        {Object.keys(stateData).length > 0 && <TickPlot data={stateData}></TickPlot>}
        {keys.length > 0 && <WS keys={keys} update={this.update} url={"ws://localhost:8081/live"}></WS>}
      </div>
    );
  }
}

export default SubscribeList;
