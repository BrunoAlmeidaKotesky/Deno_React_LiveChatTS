import {action} from 'typesafe-actions';
import {ChatReturns, ChatActions} from './actionTypes';
import { IUserInfo } from '../../interfaces/IStore';


export const setGroup = (group: string):ChatReturns => action(ChatActions.SET_GROUP, group);
export const setName = (name: string):ChatReturns=> action(ChatActions.SET_NAME, name);
export const leaveGroup = () => action(ChatActions.LEAVE_CHAT);

