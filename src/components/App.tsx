import * as React from 'react';

import { Provider } from 'react-redux';

import SideBar from './SideBar';
import AuctionList from './AuctionList';
import Footer from './Footer';
import store from '../state/Store';

import '../css/App.css';
import '../css/Footer.css';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app container-fluid">
          <SideBar/>
          <AuctionList/>
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
