import {action} from 'typesafe-actions';
import {ChatReturns, ChatActions} from './actionTypes';


export function setGroup(group: string):ChatReturns {
    return action(ChatActions.SET_GROUP, group);
}
export function setName(name: string):ChatReturns {
    return action(ChatActions.SET_NAME, name);
}
