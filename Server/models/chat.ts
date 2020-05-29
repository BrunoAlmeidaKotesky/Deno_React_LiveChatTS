import { WebSocket, isWebSocketCloseEvent, WebSocketEvent } from 'https://deno.land/std/ws/mod.ts';
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { IUser, IGroup, IUserDisplay, SocketEvents, IConnectEvent, IMessage } from "./interfaces.ts";

const userMap = new Map<string, IUser>();
const groupMap = new Map<string, IGroup>();
const messagesMap = new Map<string, IMessage>();

export default class Chat {

    public async chat(ws:WebSocket){
        const userId = v4.generate();

        for await( let data of ws){
            let event:IConnectEvent = typeof data === "string" ? JSON.parse(data) : data;
            if(isWebSocketCloseEvent(data)){
                this.leaveGroup(userId);
                break;
            }

            let userObj: IUser;
            switch(event.event){
                case SocketEvents.JOIN:{
                    //cria o objeto de usr com o websocket, nome do grupo e nome
                  userObj = {
                        userId,
                        name: event.name,
                        groupName: event.groupName,
                        ws
                    }
                    //coloca o userObj dentro do userMap
                    userMap.set(userId, userObj);
                    //Pega os usuarios do groupsMap
                    const users = groupMap.get(event.groupName) || [];
                    users.push(userObj);
                    console.log(users);
                    groupMap.set(event.groupName, users);
                    //emite aos usuarios no grupo que um novo usuario entrou
                    this.emitUserList(event.groupName);
                    //emite todas as mensagens enviadas anteriormente enviadas naquele grupo anteriormente
                    this.emitPreviousMessages(event.groupName, ws);
                    break;
                }
                case SocketEvents.MESSAGE:{
                    console.log('message received');
                    userObj = userMap.get(userId) as IUser;
                    const message:IMessage = {
                        userId,
                        name: userObj.name,
                        message: event.data,
                    }
                    this.emitMessage(userObj.groupName, message, userId);
                }
            }
        }
    }

    private getDisplayUsers(groupName: string): IUserDisplay{
        const users = groupMap.get(groupName) || [];
        return users.map(user => {
            return {userId: user.userId, name: user.name}
        })
    }

    private emitUserList(groupName: string){
        const users = groupMap.get(groupName) || [];
        for(const user of users){
            const event = {
                event: 'users',
                data: this.getDisplayUsers(groupName)
            }

            user.ws.send(JSON.stringify(event));
        }
    }

    private emitMessage(groupName: string, message: IMessage, senderId: string){
        const users = groupMap.get(groupName) || [];
        for (const user of users){
            const tempMsg:IMessage = {...message, sender: user.userId === senderId ? "me" : senderId};

            message.sender = user.userId === senderId ? 'me' : senderId;
            const event = {
                event: 'message',
                data: tempMsg,
            }
            user.ws.send(JSON.stringify(event));
        }
    }

    private emitPreviousMessages(groupName: string, ws: WebSocket) {
        const messages = messagesMap.get(groupName) || [];
      
        const event = {
          event: "previousMessages",
          data: messages,
        };
        ws.send(JSON.stringify(event));
      }

      private leaveGroup(userId: string) {
        // Take out users from groupsMap
        const userObj = userMap.get(userId);
        if (!userObj) {
          return;
        }
        let users = groupMap.get(userObj.groupName) || [];
      
        // Remove current user from users and write users back into groupsMap
        users = users.filter((u) => u.userId !== userId);
        groupMap.set(userObj.groupName, users);
      
        // Remove userId from usersMap
        userMap.delete(userId);
      
        this.emitUserList(userObj.groupName);
      }
}