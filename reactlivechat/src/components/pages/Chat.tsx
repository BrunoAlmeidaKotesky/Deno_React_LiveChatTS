import React from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import '../styles/chat.css';
import ChatSidebar from '../ChatSidebar';
import useChatSocket from '../hooks/useChatSocket';
import {leaveGroup} from '../../models/redux/actions/chatActions';

export default function Chat(){
    const history = useHistory();
    const dispacth = useDispatch();
    useChatSocket();

    return(<div className="chat-container">
    <ChatSidebar/>
    <div className="chat-main">
      <div className="chat-header">
        <div id="groupName" className="group-name">
          Javascript
        </div>
        <div>
          <button id="leaveGroupBtn" onClick={() => {
            dispacth(leaveGroup());
            history.push('/')
            }}>Leave group</button>
        </div>
      </div>
      <div id="chatMessages" className="chat-messages">
      </div>
      <div className="chat-footer">
        <div id="messageSendForm">
          <input id="messageInput" type="text" placeholder="Type message and hit enter"/>
          <button onClick={e => e.preventDefault()}>Send</button>
        </div>
      </div>
    </div>
  </div>
  );
}