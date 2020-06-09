import React, { useEffect, useState, useRef, useCallback } from 'react';
import io from 'socket.io-client';
import { useLocation, useHistory } from 'react-router';
import { IUserInfo } from '../../models/interfaces/IStore';
import { SocketEvents, IConnectEvent, REvent, IMessageEvent, IUserEvent, IMessage } from '../../models/interfaces/IEvents';
import { leaveGroup } from '../../models/redux/actions/chatActions';
import { useDispatch } from 'react-redux';

export default function useChatSocket() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [chatUsersCount, setCount] = useState(1);
  const [users, setUserInfo] = useState([]);
  const ws = useRef<WebSocket | null>(null);
  const leaveChat = () => {
    dispatch(leaveGroup());
    history.push('/');
  }
  function getQueryParams() {
    const query = new URLSearchParams(location.search);
    let name = query.get('name');
    let group = query.get('group');
    if (name !== null && group !== null)
      return { group, name };
  }

  const addMessage = useCallback((newMessage: MessageEvent) => setMessages(prevMessages => [...prevMessages, newMessage]), [messages]);

  function onConnectionOpen() {
    console.log(`Connection Opened`);
    const queryParams = getQueryParams();
    if (!queryParams?.name || !queryParams?.group) {
        history.push('/');
      return;
    }

    const event = {
      event: "join",
      groupName: queryParams.group,
      name: queryParams.name,
    };
    if(ws.current !== null)
      ws.current.send(JSON.stringify(event));
  }

  function onMessageReceived(event) {
    console.log("Message received ");
    event = JSON.parse(event.data);
    console.log(event);
    switch (event.event) {
      case "users":
        setCount(event.data.length);
        setUserInfo(event.data);
        break;
      
    }
  }

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:3001/ws');
    ws.current.addEventListener('open', onConnectionOpen);
    ws.current.addEventListener('close', (close) => console.log('Event closed: ', close));
    ws.current.addEventListener('message', onMessageReceived);
  },[]);
  
  useEffect(()=> {
    if(ws.current !== null){
    ws.current.onmessage = (msg: MessageEvent) => {
      const {data} = JSON.parse(msg.data);
      addMessage(data);
    }
  }
  },[]);

  const onMessageSent = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (ws.current) {
      console.log(ws.current);
      ws.current?.send(JSON.stringify({data: msg, event: 'message'}))
      setMsg('');
    }
  };

  useEffect(() => {
    return () => {
      if (ws.current)
        ws.current.close();
    };
  }, [ws]);

  return { onMessageSent, chatUsersCount, users, setUserInfo, setMsg, msg, setMessages, messages, leaveChat }
}