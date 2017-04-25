import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory'

class SearchBar extends Component{
  constructor(){
    super();
    this.state = {
      cacheName : ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(ev){

    ev.preventDefault();
    const cacheName = this.state.cacheName;
    const history  =  createHistory({
      basename: cacheName,
      forceRefresh: true
    });
    history.push();

  }
  handleChange(ev){
    const value = ev.target.value;
    this.setState({cacheName : value});
  }
  render(){
    return (
      <nav className="search-bar">
        <div className="nav-wrapper">
          <form onSubmit={this.handleSubmit}>
            <div className="input-field">
              <input id="search" type="search" required placeholder="cache name" onChange={this.handleChange}  value={this.state.cacheName}/>
              <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
              <i className="material-icons">close</i>
            </div>
          </form>
        </div>
      </nav>
    );
  }
}
export default SearchBar;
