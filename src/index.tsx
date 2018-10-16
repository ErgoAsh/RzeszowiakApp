import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import * as registerServiceWorker from './registerServiceWorker';
import App from './components/App';

import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

console.warn("Debug warn in index.tsx");

ReactDOM.render(<App />, document.getElementById("root"));

//registerServiceWorker();
