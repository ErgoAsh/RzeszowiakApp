import * as React from 'react';

import SideBar from './SideBar';
import AuctionList from './AuctionList';

import '../css/App.css';
import '../css/Footer.css';

class App extends React.Component {
  render() {
    return (
      <div className="app container-fluid">
        <SideBar/>
        <AuctionList/>
      </div>
    );
  }
}

export default App;
