import { IUserInfo } from "../../interfaces/IStore";

export enum ChatActions {
    SET_NAME = 'SET_NAME',
    SET_GROUP = 'SET_GROUP',
    LEAVE_CHAT = 'LEAVE_CHAT'
}

interface SetGroup {
    type: ChatActions.SET_GROUP
    payload: string;
}

interface LeaveChat {
    type: ChatActions.LEAVE_CHAT,
}

interface SetName{
    type: ChatActions.SET_NAME
    payload: string;
}

export type ChatReturns = SetGroup | SetName|LeaveChat;