import React, {Component} from 'react';
import update from 'immutability-helper';

class WS extends Component{
  constructor(){
    super();
    this.state = {
      keys : []
    }
  }
  sendMessage(key, action){
    if(this.socket === null) return;
    key = JSON.parse(key);
    const message = {
      "action" : action,
      "keys" : [key]
    }
    this.socket.send(JSON.stringify(message));
  }
  componentDidMount(){
    this.socket = new WebSocket("ws://localhost:8081/live");
    const scope = this;
    this.socket.onopen = function(event) {

      console.log("Socket is open");
      scope.props.keys.forEach(key => scope.update(key));
    	this.onmessage = (ev) => {
        const data = JSON.parse(ev.data).shift();
        const key = data.key;
        const value = data.value;
        scope.props.update(key, value);
    	};

    	// Listen for this.socket closes
    	this.onclose = (ev) =>  {
    		console.log('Client notified socket has closed',ev);
        this.socket = null;
    	};
    };
  }
  update(key){
    this.setState(prevState => {
      return update(prevState, {keys : {$push : [key]}});
    });
    this.sendMessage(key, "SUBSCRIBE");
  }
  adjust(keys){
    const currentKeys = this.state.keys;
    currentKeys.forEach(key => {
      if(keys.indexOf(key) === -1)
        this.sendMessage(key, "UNSUBSCRIBE");
    });
  }
  componentWillReceiveProps(props, state){
    let currentKeys = this.state.keys;
    let nextKeys = props.keys;
    if(nextKeys.length > currentKeys.length){
      const key = nextKeys[currentKeys.length];
      this.update(key);
    }
    if(nextKeys.length < currentKeys.length){
      this.adjust(nextKeys);
    }
  }
  render(){
    return (
      <div>
      </div>
    );
  }
}

export default WS;
