import React, { memo } from 'react';

const ChatFooter = ({onMessageSent, msg, setMsg}) => {
    return (
        <div className="chat-footer">
        <form id="messageSendForm" onSubmit={onMessageSent}>
            <input id="messageInput" value={msg} onChange={({ target }) => setMsg(target.value)}
                type="text" placeholder="Type message and hit enter" />
            <button>Send</button>
        </form>
        </div>);
}

export default memo(ChatFooter);