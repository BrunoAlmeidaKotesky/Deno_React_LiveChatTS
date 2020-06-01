import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import './components/styles/index.css';
import App from './Routes';
import {store} from './models/redux/store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
