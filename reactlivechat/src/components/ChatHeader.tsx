import React, { memo } from 'react';

type ChatHeaderProps = {group: string, onLeave: ()=> void;}
const ChatHeader = memo(({group, onLeave}: ChatHeaderProps) => {
    return(<div className="chat-header">
    <div id="groupName" className="group-name">
      {group}
    </div>
    <div>
      <button id="leaveGroupBtn" onClick={() => {
          onLeave();
        }}>Leave group</button>
    </div>
  </div>);
});

export default ChatHeader;