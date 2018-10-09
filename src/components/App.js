import React, { Component } from 'react';
import '../css/App.css';
import SideBar from './SideBar.js';
import AuctionList from './AuctionList.js';


class App extends Component {
  render() {
    return (
      <div className="app">
        <SideBar />
        <AuctionList/>
      </div>
    );
  }
}

export default App;
