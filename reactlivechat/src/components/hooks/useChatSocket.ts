import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router';
import { SocketEvents, IConnectEvent, IMessageEvent, IUserEvent, IMessage } from '../../models/interfaces/IEvents';
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
      case SocketEvents.USERS:{
        setCount(event.data.length);
        setUserInfo(event.data);
        break;
      }
      case SocketEvents.MESSAGE:{
        let chatMsgMenu = document.querySelector("#chatMessages") as HTMLDivElement;
        if(chatMsgMenu){
          const scrollToBottom = Math.floor(chatMsgMenu.offsetHeight + chatMsgMenu.scrollTop) === chatMsgMenu.scrollHeight;
          if(scrollToBottom)
             chatMsgMenu.scrollTop = 10000000;
        }
        break;
      }
      case SocketEvents.PREV_MESSAGE: {
        const prevMessages: IMessage[] = event.data;
        console.log(`Mensagens: `, messages, 'Evento: ', event.data)
        if(Array.isArray(prevMessages)){
          prevMessages.forEach((message) => {
            addMessage(message as unknown as MessageEvent);
          })
        }
        break;
      }
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
      const {data, event} = JSON.parse(msg.data);
      console.log(data, event);
      if(event === SocketEvents.MESSAGE){
        addMessage(data);
      }
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

  return { onMessageSent, chatUsersCount, users, setMsg, msg, messages, leaveChat }
}