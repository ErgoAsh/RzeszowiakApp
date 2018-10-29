import * as React from 'react';

import { Provider } from "inversify-react";
import { Container } from "inversify";
import { IDownloadService } from "../services/IDownloadService";

import SideBar from './SideBar';
import AuctionList from './AuctionList';
import Footer from './Footer';
import DownloadAuctionsService from "../services/DownloadAuctionsService";

import '../css/App.css';
import '../css/Footer.css';

const container = new Container();
container.bind<IDownloadService>("downloadService").to(DownloadAuctionsService);

//const { lazyInject } = getDecorators(container);

class App extends React.Component {
  render() {
    return (
      <Provider container={container}>
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
