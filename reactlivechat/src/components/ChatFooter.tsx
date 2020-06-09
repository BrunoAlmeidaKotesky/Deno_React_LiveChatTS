import React, { memo } from 'react';
import { RDispatch, RForm} from '../models/types/index';

type ChatFooterProps = {onMessageSent: (ev: RForm) => void, 
                        msg: string, setMsg: RDispatch<string>}
const ChatFooter = memo(({onMessageSent, msg, setMsg}:ChatFooterProps) => {
    return (
        <div className="chat-footer">
        <form id="messageSendForm" onSubmit={onMessageSent}>
            <input id="messageInput" value={msg} onChange={({ target }) => setMsg(target.value)}
                type="text" placeholder="Type message and hit enter" />
            <button>Send</button>
        </form>
        </div>);
});

export default ChatFooter