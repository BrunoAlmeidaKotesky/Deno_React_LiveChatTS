import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store()}>
      <Router>
      <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
