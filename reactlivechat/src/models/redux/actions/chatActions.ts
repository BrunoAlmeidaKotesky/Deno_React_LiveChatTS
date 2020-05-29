import { IStore } from './../../interfaces/IStore';
import {ChatReturns, ChatActions} from './actionTypes';


export function setGroup(group: string):ChatReturns {
    return {type: ChatActions.SET_GROUP, payload: group};
}
export function setName(name: string):ChatReturns {
    return {type: ChatActions.SET_NAME, payload: name};
}
