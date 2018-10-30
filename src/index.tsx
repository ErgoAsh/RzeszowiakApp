import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import * as registerServiceWorker from './registerServiceWorker';

import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App';
import { Provider } from "inversify-react";
import { Container } from "inversify";

import DownloadAuctionsService from "./services/DownloadAuctionsService";
import LinkProviderService from "./services/LinkProviderService";

const container = new Container();
container.bind("linkService").to(LinkProviderService);
container.bind("downloadService").to(DownloadAuctionsService);

ReactDOM.render(<Provider container={container}><App /></Provider>, document.getElementById("root"));
