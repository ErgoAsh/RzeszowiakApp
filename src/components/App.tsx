import * as React from 'react';

import SideBar from './SideBar';
import AuctionList from './AuctionList';

import '../css/App.css';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <SideBar/>
        <AuctionList/>
      </div>
    );
  }
}

export default App;
