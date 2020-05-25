import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Chat from './Chat';
import Home from './Home';
import useChatSocket from '../hooks/useChatSocket';

export default function MainRoutes() {
    useChatSocket();
    return (
        <div>
        <Switch>
         <Route exact path="/index" component={Home}/>
         <Route path="/chat" component={Chat}/>
        </Switch>
        </div>);
}