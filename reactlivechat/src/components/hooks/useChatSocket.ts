import { useLocation, useHistory } from 'react-router';
import React, {useEffect} from 'react';
import { IUserInfo } from '../../models/interfaces/IStore';
import { SocketEvents, IConnectEvent, REvent } from '../../models/interfaces/IEvents';

export default function useChatSocket(){
    const location = useLocation();
    const history = useHistory();
    let ws = new WebSocket('ws://localhost:3001/ws');

    useEffect(()=> {
    function getQueryParams() {
        const query = new URLSearchParams(location.search);
        let name = query.get('name');
        let group = query.get('group');
        let params: IUserInfo;
        if(name !== null && group !== null)
         return params = {group,name};
      }
    function onConnectionOpen() {
        console.log(`Connection Opened`);
        const queryParams = getQueryParams();
        if (!queryParams?.name || !queryParams?.group)
          history.push('/');
        
        const event: IConnectEvent = {
          event: SocketEvents.JOIN,
          groupName: queryParams?.group as string,
          name: queryParams?.name as string,
        };
        ws.send(JSON.stringify(event));
      }
    
    ws.addEventListener('open', onConnectionOpen);
    },[]);

    const onMessageSent = (ev: REvent) => {
      //if (!messageInput.value)
        //return;
      
      const event = {
        event: SocketEvents.MESSAGE,
        data: ''//messageInput.value,
      };
      ws.send(JSON.stringify(event));
      //messageInput.value = "";
    };
}