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
    if(!this.socket){
      console.log("Socket was closed due to inactivity, attempting to reconnect to websocket.");
      this.initializeWebSocket();
    }
    key = JSON.parse(key);
    const message = {
      "action" : action,
      "keys" : [key]
    }
    this.socket.send(JSON.stringify(message));
  }
  initializeWebSocket(){
    this.socket = new WebSocket(this.props.url);
    const scope = this;
    this.socket.onopen = function(event) {

      console.log("Socket is open");
      scope.props.keys.forEach(key => scope.update(key));
      this.onmessage = (ev) => {
        const data = JSON.parse(ev.data).shift();
        scope.props.update(data);
      };

      // Listen for close ev
      this.onclose = (ev) =>  {
        console.log('Client notified socket has closed',ev);
        this.socket = null;
      };
    };
  }
  componentDidMount(){
    this.initializeWebSocket();
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
  componentWillReceiveProps(nextProps, state){
    let currentKeys = this.state.keys;
    let nextKeys = nextProps.keys;
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
