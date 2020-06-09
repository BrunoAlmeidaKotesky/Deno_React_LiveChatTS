import React,{memo} from 'react';

type Props = {username: string}
const ChatUsers = memo(({username}:Props) => <div className="chat-user">{username}</div>);
export default ChatUsers;