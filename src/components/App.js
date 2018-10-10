import React, { Component } from 'react';
import '../css/App.css';
import SideBar from './SideBar.js';
import AuctionList from './AuctionList.js';
import Footer from './Footer.js';
import '../css/Footer.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <SideBar />
        <AuctionList/>
        <Footer />
      </div>
    );
  }
}

export default App;
