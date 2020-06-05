import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import '../styles/chat.css';
import ChatSidebar from '../ChatSidebar';
import useChatSocket from '../hooks/useChatSocket';
import {leaveGroup} from '../../models/redux/actions/chatActions';
import { RootState } from '../../models/redux/store';
import Messages from '../Message';

export default function Chat(){
    const history = useHistory();
    const dispacth = useDispatch();
    const { group } = useSelector((state: RootState)=>state.chatReducer.userInfo);
    const {msg,setMsg, onMessageSent, users, chatUsersCount, messages, setMessages } = useChatSocket();
    useEffect(()=> {
      console.log(messages);
    },[messages]);
    return(<div className="chat-container">
    <ChatSidebar data={users} chatUserCount={chatUsersCount}/>
    <div className="chat-main">
      <div className="chat-header">
        <div id="groupName" className="group-name">
          {group}
        </div>
        <div>
          <button id="leaveGroupBtn" onClick={() => {
            dispacth(leaveGroup());
            history.push('/')
            }}>Leave group</button>
        </div>
      </div>
      <div id="chatMessages" className="chat-messages">
        {messages?.length > 0 && messages.map((m, i) => <Messages key={Math.random().toString()} messageData={m}/>)}
      </div>
      <div className="chat-footer">
        <form id="messageSendForm" onSubmit={onMessageSent}>
          <input id="messageInput" value={msg} onChange={({target}) => setMsg(target.value)}
                 type="text" placeholder="Type message and hit enter"/>
          <button>Send</button>
        </form>
      </div>
    </div>
  </div>
  );
}