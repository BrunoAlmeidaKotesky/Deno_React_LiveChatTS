import { WebSocket } from "https://deno.land/std/ws/mod.ts";
export interface IUser{
    userId: string;
    name: string;
    group: string;
    ws: WebSocket;
}
export type IGroup = IUser[];

export type IUserDisplay = Pick<IUser, 'userId'|'name'>[];

export enum SocketEvents{
    JOIN = 'join'
}

export interface IConnectEvent{
    event: SocketEvents;
    groupName: string;
    name: string;
}