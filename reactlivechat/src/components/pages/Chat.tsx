import React from 'react';
import {useHistory} from 'react-router-dom';
import '../styles/chat.css';
import ChatSidebar from '../ChatSidebar';

export default function Chat(){
    const history = useHistory();
  
    return(<div className="chat-container">
    <ChatSidebar/>
    <div className="chat-main">
      <div className="chat-header">
        <div id="groupName" className="group-name">
          Javascript
        </div>
        <div>
          <button id="leaveGroupBtn" onClick={() => history.push('/lobby')}>Leave group</button>
        </div>
      </div>
      <div id="chatMessages" className="chat-messages">
      </div>
      <div className="chat-footer">
        <form id="messageSendForm">
          <input id="messageInput" type="text" placeholder="Type message and hit enter"/>
          <button onClick={e => e.preventDefault()}>Send</button>
        </form>
      </div>
    </div>
  </div>
  );
}