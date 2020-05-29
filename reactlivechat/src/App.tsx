import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './components/styles/App.css';
import Lobby from './components/pages/Lobby';
import Chat from './components/pages/Chat';

export default function MainRoutes() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Lobby}/>
          <Route path="/chat" component={Chat}/>
        </Switch>
      </BrowserRouter>
      </header>
    </div>
  );
}
