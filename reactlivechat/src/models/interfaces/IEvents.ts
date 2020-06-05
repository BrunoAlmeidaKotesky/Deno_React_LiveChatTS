export enum SocketEvents{
    JOIN = 'join',
    MESSAGE = 'message',
    USERS = 'users',
    PREV_MESSAGE = 'previousMessages'
}

export interface IEvents{
    event: SocketEvents;
    groupName: string;
    name: NonNullable<string>;
    data?: NonNullable<string>;
}

export interface IUserEvent{
    event: SocketEvents;
    data: IMessage|IMessage[];
}
export interface IMessage{
    userId: string;
    name: string;
    message?: string;
    sender?: "me" | string;
}

export type IConnectEvent = Omit<IEvents, 'data'>;
export type IMessageEvent = Omit<IEvents, 'groupName'|'name'>
export type REvent = React.MouseEvent<HTMLButtonElement, MouseEvent>
export type RTarget = EventTarget & HTMLInputElement;