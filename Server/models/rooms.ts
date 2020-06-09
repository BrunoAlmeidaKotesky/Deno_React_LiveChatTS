import { WebSocket, isWebSocketCloseEvent, WebSocketEvent } from 'https://deno.land/std/ws/mod.ts';
import { v4 } from "https://deno.land/std/uuid/mod.ts";

interface IRoom {
    ws?: WebSocket;
    roomName: string;
    roomId: string;
    roomDescription: string;
}
const roomsMap = new Map<string, IRoom[]>();
const roomMap = new Map<string, IRoom>();

export default class Rooms {

    public async main(ws: WebSocket) {
        const roomId = v4.generate();

        for await(const data of ws){
            let event = typeof data === 'string' ? JSON.parse(data) : data;
            let roomObj: IRoom;
            switch(event.event){
                case 'createRoom': {
                    roomObj = {roomDescription: event.description, 
                               roomName: event.roomName, 
                               roomId,
                               ws};
                    console.log(roomObj);
                    roomMap.set(roomId, roomObj);
                    const rooms = roomsMap.get(event.roomName) || [];
                        rooms.push(roomObj);
                    console.log(rooms);
                    this.createRoom(event.roomName);
                    break;
                }
            }
        }
    }

    private displayRooms(roomName: string): IRoom[]{
        const rooms = roomsMap.get(roomName) || [];
        return rooms.map(r => {
            return {roomDescription: r.roomDescription, 
                    roomId: r.roomId, 
                    roomName: r.roomName}
        });
    }

    private async createRoom(roomName: string){
        const rooms = roomsMap.get(roomName) || [];
        for(const room of rooms){
            const roomEv = {
                event: 'createRoom',
                data: this.displayRooms(room.roomName)
            }
            console.log(this.displayRooms(room.roomName))
            room.ws?.send(JSON.stringify(roomEv));
        }

    }
}