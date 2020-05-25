import { WebSocket, isWebSocketCloseEvent } from 'https://deno.land/std/ws/mod.ts';
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { IUser, IGroup, IUserDisplay, SocketEvents, IConnectEvent } from "./interfaces.ts";

export default class Chat {
    private userMap = new Map<string, IUser>();
    private groupMap = new Map<string, IGroup>();

    public async chat(ws:WebSocket){
        const userId = v4.generate();

        for await( let data of ws){
            let event:IConnectEvent = typeof data === "string" ? JSON.parse(data) : data;
            if(isWebSocketCloseEvent(data)){
                let userObj = this.userMap.get(userId) as IUser;
                let users = this.groupMap.get(userObj.group) ?? [];
                users = users.filter(u => u.userId !== userId);

                this.groupMap.set(userObj.group, users);

                this.userMap.delete(userId);
                this.emitEvent(userObj.group);
                break;
            }
            console.log(event);
            switch(event.event){
                case SocketEvents.JOIN:{
                    const userObj:IUser = {
                        userId,
                        name: event.name,
                        group: event.groupName,
                        ws
                    }
                    this.userMap.set(userId, userObj);
                    const users = this.groupMap.get(event.groupName) ?? [];
                    users.push(userObj);
                    this.groupMap.set(event.groupName, users);

                    this.emitEvent(event.groupName);
                }
            }
        }
    }

    private getDisplayUsers(group: string): IUserDisplay{
        const users = this.groupMap.get(group) ?? [];
        return users.map(user => {
            return {userId: user.userId, name: user.name}
        })
    }

    private emitEvent(group: string){
        const users = this.groupMap.get(group) ?? [];
        for(const user of users){
            const event = {
                event: 'users',
                data: this.getDisplayUsers(group)
            }

            user.ws.send(JSON.stringify(event));
        }
    }
}