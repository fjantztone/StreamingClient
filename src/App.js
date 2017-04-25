import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import 'whatwg-fetch';
import './App.css';
import SearchBar from './Components/SearchBar.js';
import Explore from './Components/Explore.js';



class Home extends Component{
  render(){
    return (
      <div className="row">
        <div className="col s6 offset-s3">
          <SearchBar></SearchBar>
        </div>
      </div>
    );
  }
}
const AppHeader = () => (
  <div className="App-header">
    <div className="row">
      <div className="col s12">
        <h4 className="center-align">A <strong>dashboard</strong> for visualizing data..</h4>
      </div>
    </div>
  </div>
)
class App extends Component {
  render() {

    return (
      <div className="App">
        <div className="container">
            <AppHeader></AppHeader>
          <div className="App-content">
            <Router>
              <Route exact path="/" component={Home}/>
            </Router>
            <Router>
              <Route exact path="/:cacheName" component={Explore}/>
            </Router>
          </div>
        </div>
      </div>

    );
  }
}


export default App;
