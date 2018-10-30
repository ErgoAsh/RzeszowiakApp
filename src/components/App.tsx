import * as React from 'react';

import { Provider } from "inversify-react";
import { Container } from "inversify";

import SideBar from './SideBar';
import AuctionList from './AuctionList';
import Footer from './Footer';
import DownloadAuctionsService from "../services/DownloadAuctionsService";
import LinkProviderService from "../services/LinkProviderService";

import '../css/App.css';
import '../css/Footer.css';



class App extends React.Component<{}, {}> {

  private readonly container: Container;

  constructor(props: any, context: any) {
    super(props, context);

    this.container = new Container();
    this.container.bind("linkService").to(LinkProviderService);
    this.container.bind("downloadService").to(DownloadAuctionsService);
  }

  render() {
    return (
      <Provider container={this.container}>
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
