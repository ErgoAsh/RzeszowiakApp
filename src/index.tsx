import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'mobx-react';
import App from './components/App';
import AuctionStore from './stores/AuctionStore';
import DownloadAuctionsService from './services/DownloadAuctionsService';
import LinkProviderService from './services/LinkProviderService';
import AuctionConfigStore from './stores/AuctionConfigStore';

import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const downloadService = new DownloadAuctionsService();
const linkService = new LinkProviderService();
const auctionConfigStore = new AuctionConfigStore();
const auctionStore = new AuctionStore(downloadService, linkService, auctionConfigStore)

const inject = { 
    downloadService,
    linkService,
    auctionConfigStore,
    auctionStore
};
console.log("aaaa");
ReactDOM.render(
    <Provider {...inject}>
        <App />
    </Provider>, 
document.getElementById("root"));

