export enum SocketEvents{
    JOIN = 'join',
    MESSAGE = 'message',
    USERS = 'users',
    PREV_MESSAGE = 'previousMessages'
}

export interface IEvents{
    event?: SocketEvents;
    groupName?: string;
    name?: NonNullable<string>;
    data?: NonNullable<IMessage>;
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
export type IMessageEvent = Omit<IEvents, 'groupName'|'name'>;
