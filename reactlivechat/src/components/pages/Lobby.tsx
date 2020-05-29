import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import GroupOptions from '../GroupOptions';
import '../styles/chat.css';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../models/redux/store';
import { setName } from '../../models/redux/actions/chatActions';

export default function Lobby(){
    const history = useHistory();
    const dispatch = useDispatch();
    const {userInfo: {group, name}} = useSelector((state: RootState) => state.chatReducer);

    const joinChat = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if(group !== '' && name !== '')
        history.push(`/chat?name=${group}&group=${group}`);
    }

    return(<div className="login-form">
    <div className="form-header">
      <h2>DenoChat</h2>
    </div>
    <div className="form-content">
      <div className="input-group">
        <input type="text" placeholder="Enter your name" name="name" onChange={({currentTarget}) => dispatch(setName(currentTarget.value))}/>
      </div>
    <GroupOptions/>
    </div>
    <div className="form-footer">
      <button id="joinChatBtn" onClick={joinChat}>Login</button>
    </div>
  </div>);
}