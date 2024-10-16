import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { FriendRequestService } from 'src/friend-request/friend-request.service';
import { NotificationService } from 'src/notification/notification.service';

////////////////////////////Socket server init/////////////////////////////////
@WebSocketGateway({
  cors: {
    allowedHeaders:"*",
    origin: "*", // Adjust this to match your needs
    methods: ['GET','POST'],
    credentials:true
  },
})
export class NotificationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private notification:NotificationService,private friendRequest:FriendRequestService){}
  @WebSocketServer() server: Server;
  afterInit(server: Server) {
    console.log('Socket server initialized');
  }


///////////////////////////////////////////////Collect All Online Users Data///////////////////////////////////////
  private onlineUsers = []
   connectedUsesrs =async (socketId,userId) =>{
       const isExist = await this.onlineUsers.some((u)=>u.userId === userId);
       if (!isExist) {
          await this.onlineUsers.push({socketId,userId})
       } 
      //  if (isExist && this.onlineUsers.length > 0) {
      //   const changeId = await this.onlineUsers.find(U=> U.userId === userId);
      //   changeId.socketId = socketId
      //  }//
  }
////////////////////////////////////////Methin For Connetted Users//////////////////////////////////////////
  async handleConnection(client: Socket) {
    const userId =await client.handshake.query.userId;
    console.log(`User connected: ${userId} and sid:${client.id}`);
    if (userId !== undefined) {
      ///////////////////////////////////////////////////////////////////////////////////
      // await this.reader.updateUserOnlineStatus(userId,true)
     ///////////////////////////////////////////////////////////////////////////////////////
     await this.connectedUsesrs(client.id,userId)
      client.on("send-message-to-my-friend",(async (data)=>{
       const myCurrentFriend = await this.onlineUsers.filter(U=>U.userId === data?.receiverId)
       await client.to(myCurrentFriend[0]?.socketId).emit("get-message-from-my-friend",data)
       console.log(myCurrentFriend[0]?.socketId)
      }))
      let ids = [];
      await this.onlineUsers?.map(user=>{
        ids.push(user?.userId)
        //  client.emit()
      })
       await client.emit('onlineFriends',ids)
    }
   
    // setTimeout(async() => {
    //   if (userId !== undefined) {
    //     await this.reader.updateUserOnlineStatus(userId,false)
    //     console.log('off')
    //   }
    // }, 60 * 1000 * 10);
  }

  
//////////////////////////////Remove All Offline Users///////////////////////////////////////
removeOfflineUsers = async (socketId) => {
  this.onlineUsers = await this.onlineUsers.filter(u=>u.socketId !== socketId);
}
  ////////////////////////////////////////Methin For disConnetted Users////////////////////////////////////////////
  async handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId;
    if (userId !== undefined) {
      //////////////////////////////////////////////////////////////////////////////
      // await this.reader.updateUserOnlineStatus(userId,false)//
      //////////////////////////////////////////////////////////////////////////////
     await this.removeOfflineUsers(client.id)
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
