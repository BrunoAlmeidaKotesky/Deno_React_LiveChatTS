/* eslint-disable no-unused-expressions */
import React from 'react';
import './styles/chat.css';
import { IUserInfo } from '../models/interfaces/IStore';
import ChatUsers from './ChatUsers';

export default function ChatSidebar({data, chatUserCount}: {data: any[], chatUserCount: number}):JSX.Element {
    return (
    <div className="chat-sidebar">
        <h3>Room users: <span id="chatUsersCount">({chatUserCount})</span></h3>
        <div id="chatUsers" className="chat-users">
        {data.length > 0 && data.map((u:IUserInfo, i) => <ChatUsers key={i.toString()} username={u.name}/>)}
        </div>
    </div>);
}