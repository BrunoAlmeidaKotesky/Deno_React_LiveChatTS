import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import '../styles/chat.css';
import ChatSidebar from '../ChatSidebar';
import ChatFooter from '../ChatFooter';
import ChatHeader from '../ChatHeader';
import useChatSocket from '../hooks/useChatSocket';
import {leaveGroup} from '../../models/redux/actions/chatActions';
import { RootState } from '../../models/redux/store';
import Message from '../Message';

export default function Chat(){
    const history = useHistory();
    const { group } = useSelector((state: RootState)=>state.chatReducer.userInfo);
    const {msg,setMsg, onMessageSent, users, chatUsersCount, messages, setMessages, leaveChat} = useChatSocket();

    useEffect(()=> {
      console.log(messages);
    },[messages]);

    return(<div className="chat-container">
    <ChatSidebar data={users} chatUserCount={chatUsersCount}/>
    <div className="chat-main">
      <ChatHeader group={group} onLeave={leaveChat}/>
      <div id="chatMessages" className="chat-messages">
        {messages.length > 0 && messages.map((m, i) => <Message key={Math.random().toString()} messageData={m}/>)}
      </div>
     <ChatFooter msg={msg} setMsg={setMsg} onMessageSent={onMessageSent}/>
    </div>
  </div>
  );
}