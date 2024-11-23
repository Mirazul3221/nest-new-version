import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayInit,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    allowedHeaders: '*',
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
////////////////////////////Socket server init/////////////////////////////////
@WebSocketGateway({
  cors: {
    allowedHeaders: '*',
    origin: '*', // Adjust this to match your needs
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class NotificationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {}
  @WebSocketServer() server: Server;
  afterInit(server: Server) {
    console.log('Socket server initialized');
  }

  ///////////////////////////////////////////////Collect All Online Users Data///////////////////////////////////////
  private onlineUsers = [];
  private socketUsers = {};
  connectedUsesrs = async (socketId, userId) => {
    const isExist = await this.onlineUsers.some((u) => u.userId === userId);
    if (!isExist) {
      await this.onlineUsers.push({ socketId, userId });
    }
    if (isExist) {
      const changeId = await this.onlineUsers.find((U) => U.userId === userId);
      changeId.socketId = socketId;
    } //
  };
  ////////////////////////////////////////Method For Connetted Users//////////////////////////////////////////
  async handleConnection(client: Socket) {
    const userId = (await client.handshake.query.myId) as string;
    if (!this.socketUsers[userId]) {
      this.socketUsers[userId] = [];
    }
    this.socketUsers[userId].push(client.id);
    if (userId) {
      ///////////////////////////////////////////////////////////////////////////////////////////////////////
      client.on('checkSenderOnlineStatus', async (data) => {
        let isOnline = Object.keys(this.socketUsers)?.some((u) => u === data);
        client.emit('getSenderOnlineStatus', isOnline);
        console.log(data);
      });
      /////////////////////////////////////////Here is the logic for messaging////////////////////////////////////////////
      client.on('send-message-to-my-friend', async (data) => {
        if (this.socketUsers[data?.receiverId]?.length > 0) {
          this.socketUsers[data?.receiverId]?.map(async (id) => {
            await client.to(id).emit('get-message-from-my-friend', data);
          });
        }
      });
      //////////////////////////////////////////logi for new messanger/////////////////////////////
      client.on('message-to',(data)=>{
        if (this.socketUsers[data?.receiverId]?.length > 0) {
          this.socketUsers[data?.receiverId]?.map(async (id) => {
            await this.server.to(id).emit('message-from', data);
          });
        }
      })
      ////////////////////////////////////////////////////////////////////////////////////////
      client.on('typingMsg', async (data) => {
        if (this.socketUsers[data?.receiverId]?.length > 0) {
          this.socketUsers[data?.receiverId]?.map(async (id) => {
            await this.server.to(id).emit('getTypingMsg', data);
          });
        }
      });
      client.on('typingalert', async (data) => {
        if (this.socketUsers[data?.receiverId]?.length > 0) {
          this.socketUsers[data?.receiverId]?.map(async (id) => {
            await this.server.to(id).emit('typingalert', data);
          });
        }
      });
      /////////////////////////////////////////////////////////////////////////////////////////
      client.on('openMessageWindow', async (data) => {
        if (this.socketUsers[data?.receiverId]?.length > 0) {
          this.socketUsers[data?.receiverId]?.map(async (id) => {
            await client.to(id).emit('getOpenMessageWindow', data.status);
          });
        }
      });

      /////////////////////////////Here is the logic for notification/////////////////////////////
      client.on('new-notification', async (data) => {
        console.log('notif' , data)
        if (this.socketUsers[data]?.length > 0) {
          this.socketUsers[data]?.map(async (id) => {
            await this.server.to(id).emit('new-notification', 'new message');
          });
        }
      });

      //////////////////////////Here is the logic for active users////////////////////////////////
      const userIds = Object.keys(this.socketUsers);
      await this.server.emit('onlineFriends', userIds);

      ////////////////////////////////////Logic for video and audio call system////////////////////////////////////////////
      await client.on('signal-call', (data) => {
        if (this.socketUsers[data?.receiverId]?.length > 0) {
          this.socketUsers[data?.receiverId]?.map(async (id) => {
            await this.server.to(id).emit('signal-call', data);
          }); ////

          this.socketUsers[data?.senderId]?.map(async (id) => {
            await this.server.to(id).emit('call-reached', this.socketUsers);
          });
        }
      });
      ///////////////////////////////////////////////////////////////////////////////////
      await client.on('end-call', (req) => {
        if (this.socketUsers[req?.id]?.length > 0) {
          this.socketUsers[req?.id]?.map(async (id) => {
            await this.server.to(id).emit('end-call-signal', req?.end);
          });
        }
      });
      //////////////////////////////////////////////////////////////////////////
      await client.on('callStatus', (req) => {
        if (this.socketUsers[req?.id]?.length > 0) {
          this.socketUsers[req?.id]?.map(async (id) => {
            await this.server
              .to(id)
              .emit('callStatus', { msg: req?.msg, answer: req.answer });
          });
        }
      });
      //////////////////////////////New Logic for WEBrtc//////////////////////////////
      await client.on('receivedCallSuccess', (res) => {
        if (this.socketUsers[res?.friendId]?.length > 0) {
          this.socketUsers[res?.friendId]?.map(async (id) => {
            await this.server.to(id).emit('receivedCallSuccess', res);
          });
        }
      });
      //////////////////////////////////////receive offer////////////////////////////////////
      await client.on('offer', (res) => {
        if (this.socketUsers[res?.friend]?.length > 0) {
          this.socketUsers[res?.friend]?.map(async (id) => {
            await this.server.to(id).emit('offer', res);
          });
        }
      });
      //////////////////////////////////////receive answer////////////////////////////////////
      await client.on('answer', (res) => {
        if (this.socketUsers[res?.friend]?.length > 0) {
          this.socketUsers[res?.friend]?.map(async (id) => {
            await this.server.to(id).emit('answer', res);
          });
        }
      });
      ///////////////////////////////////////////////////////////////////
      await client.on('icecandidate', (res) => {
        if (this.socketUsers[res?.friend]?.length > 0) {
          this.socketUsers[res?.friend]?.map(async (id) => {
            await this.server.to(id).emit('icecandidate', res.candidate);
          });
        }
      });

      //////////////////////logic for screen sharing//////////////////////
      await client.on('screen-sharing',res=>{
        if (this.socketUsers[res?.friend]?.length > 0) {
          this.socketUsers[res?.friend]?.map(async (id) => {
            await this.server.to(id).emit('screen-sharing', res.isSharing);
          });
        }
      })
    }
  } ///////
  //
  ////////////////////////////////////////Method For disConnetted Users////////////////////////////////////////////
  async handleDisconnect(client: Socket) {
    const userId = (await client.handshake.query.myId) as string;

    this.socketUsers[userId] = this.socketUsers[userId].filter(
      (socketId) => socketId !== client.id,
    ); //

    if (this.socketUsers[userId].length === 0) {
      delete this.socketUsers[userId];
    }
    // client.on('friendsId', (data) => {});
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////
} //

// //////////////////////////////Remove All Offline Users///////////////////////////////////////
// removeOfflineUsers = async (socketId) => {
//   this.onlineUsers = await this.onlineUsers.filter(
//     (u) => u.socketId !== socketId,
//   );
// };
