export enum SocketEvents{
    JOIN = 'join',
    MESSAGE = 'message'
}

export interface IEvents{
    event: SocketEvents;
    groupName: string;
    name: NonNullable<string>;
    data?: NonNullable<string>;
}

export type IConnectEvent = Omit<IEvents, 'data'>;
export type REvent = React.MouseEvent<HTMLButtonElement, MouseEvent>