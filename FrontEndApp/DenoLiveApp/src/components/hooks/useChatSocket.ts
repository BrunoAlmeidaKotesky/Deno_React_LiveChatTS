import React, {useEffect} from 'react';
import {useHistory, useLocation, useParams} from 'react-router';
import { SocketEvents } from '../../models/constants';
import { IUserQuery } from '../../models/interface';

export default function useChatSocket(){
    const location = useLocation();
    const history = useHistory();

    function getUrlQueryParamns(){
        const search = location.search.substring(1);
        const pairs = search.split('&');
        const paramns = {};
        for (const pair of pairs){
            const parts = pair.split('=');
            paramns[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
        }
        return paramns as IUserQuery;
    }

    useEffect(() => {
        let ws: WebSocket;
        function onConnectionOpen(){
            console.log('connection opened');
            const queryParamns = getUrlQueryParamns();
            if((!queryParamns.name || !queryParamns.group) && queryParamns!== undefined){
                history.push('/chat');
            }
            const event = { 
                event: SocketEvents.JOIN,
                groupName: queryParamns.group,
                name: queryParamns.name
            }
            ws.send(JSON.stringify(event));
        }
        function onMessageReceived(event){
            console.log('Message received', event);
            const data = JSON.parse(event.data);
            console.log(data);
        }
        ws = new WebSocket(`ws://localhost:3001/ws`);
        ws.addEventListener('open', onConnectionOpen);
        ws.addEventListener('messsage', onMessageReceived);
        ws.addEventListener('close', (e)=> console.log(e))

    },[]);
}