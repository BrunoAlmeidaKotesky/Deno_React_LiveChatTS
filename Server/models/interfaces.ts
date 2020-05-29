import { WebSocket } from "https://deno.land/std/ws/mod.ts";
export interface IUser{
    userId: string;
    name: string;
    groupName: string;
    ws: WebSocket;
}
export type IGroup = IUser[];

export type IUserDisplay = Pick<IUser, 'userId'|'name'>[];

export enum SocketEvents{
    JOIN = 'join',
    MESSAGE = 'message'
}

export interface IMessage{
    userId: string;
    name: string;
    message: string;
    sender?: string;
}

export interface IConnectEvent{
    event: SocketEvents;
    groupName: string;
    name: string;
    data: string;
}