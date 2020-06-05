import React, { memo } from 'react';
import { IMessage } from '../models/interfaces/IEvents';

const Messages = ({ messageData }) => {
    return (messageData && <div className={`message message-${messageData?.sender === "me" ? "to" : "from"}`}>
        {messageData.sender === "me" ? "" : <h4>{messageData?.name}</h4>}
        <p className="message-text">{messageData.msg}</p>
    </div>)
}
export default memo(Messages);