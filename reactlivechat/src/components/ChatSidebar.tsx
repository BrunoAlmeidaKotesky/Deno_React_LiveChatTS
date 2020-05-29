import React from 'react';
import './styles/chat.css';

export default function ChatSidebar() {
    return (
    <div className="chat-sidebar">
        <h3>Room users: <span id="chatUsersCount"></span></h3>
        <div id="chatUsers" className="chat-users">
        </div>
    </div>);
}