import React, { memo } from 'react';
import { IMessage } from '../models/interfaces/IEvents';

const Message = ({ messageData }) => {
    if(Array.isArray(messageData) || messageData.message === undefined) return null;
    return (messageData && <div className={`message message-${messageData?.sender === "me" ? "to" : "from"}`}>
        {messageData.sender === "me" ? "" : <h4>{messageData?.name}</h4>}
        <p className="message-text">{messageData.message}</p>
    </div>)
}
export default memo(Message);