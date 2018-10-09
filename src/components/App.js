import React, { Component } from 'react';
import '../css/App.css';
import SideBar from './SideBar.js';
import AuctionList from './AuctionList.js';

const auctionsMock = ['1','2','3','4','5'];

class App extends Component {
  render() {
    return (
      <div className="container">
        <SideBar />
        <AuctionList/>
      </div>
    );
  }
}

export default App;
