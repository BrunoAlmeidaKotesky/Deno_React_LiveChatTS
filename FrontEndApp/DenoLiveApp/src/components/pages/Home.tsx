import React from 'react';
import '../app.css';
import { useHistory } from 'react-router';

export default function Home(){
  const history = useHistory();
    return(<div className="chat-container">
    <div className="chat-sidebar">
      <h3>Room users (<span id="chatUsersCount"></span>)</h3>
      <div id="chatUsers" className="chat-users">
      </div>
    </div>
    <div className="chat-main">
      <div className="chat-header">
        <div id="groupName" className="group-name">
          Javascript
        </div>
        <div>
          <button id="leaveGroupBtn">Leave group</button>
        </div>
      </div>
      <div id="chatMessages" className="chat-messages">
      </div>
      <div className="chat-footer">
        <form id="messageSendForm">
          <input id="messageInput" type="text" placeholder="Type message and hit enter"/>
          <button onClick={()=>history.push('/chat')}>Send</button>
        </form>
      </div>
    </div>
  </div>
);
}