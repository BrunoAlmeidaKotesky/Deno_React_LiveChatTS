export enum ChatActions{
    SET_NAME = 'SET_NAME',
    SET_GROUP = 'SET_GROUP'
}

interface SetGroup {
    type: ChatActions.SET_GROUP
    payload: string;
}

interface SetName{
    type: ChatActions.SET_NAME
    payload: string;
}

export type ChatReturns = SetGroup | SetName;