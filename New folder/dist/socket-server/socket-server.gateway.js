"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let NotificationsGateway = class NotificationsGateway {
    constructor() {
        this.onlineUsers = [];
        this.socketUsers = {};
        this.connectedUsesrs = async (socketId, userId) => {
            const isExist = await this.onlineUsers.some((u) => u.userId === userId);
            if (!isExist) {
                await this.onlineUsers.push({ socketId, userId });
            }
            if (isExist) {
                const changeId = await this.onlineUsers.find((U) => U.userId === userId);
                changeId.socketId = socketId;
            }
        };
    }
    afterInit(server) {
        console.log('Socket server initialized');
    }
    async handleConnection(client) {
        const userId = (await client.handshake.query.myId);
        if (!this.socketUsers[userId]) {
            this.socketUsers[userId] = [];
        }
        this.socketUsers[userId].push(client.id);
        if (userId) {
            client.on('checkSenderOnlineStatus', async (data) => {
                let isOnline = Object.keys(this.socketUsers)?.some((u) => u === data);
                client.emit('getSenderOnlineStatus', isOnline);
            });
            client.on('send-message-to-my-friend', async (data) => {
                if (this.socketUsers[data?.receiverId]?.length > 0) {
                    this.socketUsers[data?.receiverId]?.map(async (id) => {
                        await client.to(id).emit('get-message-from-my-friend', data);
                    });
                }
            });
            client.on('message-to', (data) => {
                if (this.socketUsers[data?.receiverId]?.length > 0) {
                    this.socketUsers[data?.receiverId]?.map(async (id) => {
                        await this.server.to(id).emit('message-from', data);
                    });
                }
            });
            client.on('set-seen-validation', (data) => {
                if (this.socketUsers[data?.receiverId]?.length > 0) {
                    this.socketUsers[data?.receiverId]?.map(async (id) => {
                        await this.server.to(id).emit('get-seen-validation', data);
                    });
                }
                else {
                    if (this.socketUsers[data?.senderId]?.length > 0) {
                        this.socketUsers[data?.senderId]?.map(async (id) => {
                            await this.server.to(id).emit('not-active', 'user is not online');
                        });
                    }
                }
            });
            client.on('validation-status', (data) => {
                if (this.socketUsers[data?.sender]?.length > 0) {
                    this.socketUsers[data?.sender]?.map(async (id) => {
                        await this.server.to(id).emit('validation-status', data);
                    });
                }
            });
            client.on('check-message-unseen-status', (data) => {
                console.log(data);
                if (this.socketUsers[data?.senderId]?.length > 0) {
                    this.socketUsers[data?.senderId]?.map(async (id) => {
                        await this.server.to(id).emit('check-message-unseen-status', data);
                    });
                }
            });
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
            client.on('openMessageWindow', async (data) => {
                if (this.socketUsers[data?.receiverId]?.length > 0) {
                    this.socketUsers[data?.receiverId]?.map(async (id) => {
                        await client.to(id).emit('getOpenMessageWindow', data.status);
                    });
                }
            });
            client.on('sendEmojiInMessage', async (data) => {
                if (this.socketUsers[data?.receiverId]?.length > 0) {
                    this.socketUsers[data?.receiverId]?.map(async (id) => {
                        await client.to(id).emit('sendEmojiInMessage', data);
                    });
                }
            });
            client.on('new-notification', async (data) => {
                if (this.socketUsers[data]?.length > 0) {
                    this.socketUsers[data]?.map(async (id) => {
                        await this.server.to(id).emit('new-notification', 'new message');
                    });
                }
            });
            const userIds = Object.keys(this.socketUsers);
            await this.server.emit('onlineFriends', userIds);
            await client.on('signal-call', (data) => {
                if (this.socketUsers[data?.receiverId]?.length > 0) {
                    this.socketUsers[data?.receiverId]?.map(async (id) => {
                        await this.server.to(id).emit('signal-call', data);
                    });
                    this.socketUsers[data?.senderId]?.map(async (id) => {
                        await this.server.to(id).emit('call-reached', this.socketUsers);
                    });
                }
            });
            await client.on('end-call', (req) => {
                if (this.socketUsers[req?.id]?.length > 0) {
                    this.socketUsers[req?.id]?.map(async (id) => {
                        await this.server.to(id).emit('end-call-signal', req?.end);
                    });
                }
            });
            await client.on('callStatus', (req) => {
                if (this.socketUsers[req?.id]?.length > 0) {
                    this.socketUsers[req?.id]?.map(async (id) => {
                        await this.server
                            .to(id)
                            .emit('callStatus', { msg: req?.msg, answer: req.answer });
                    });
                }
            });
            await client.on('receivedCallSuccess', (res) => {
                if (this.socketUsers[res?.friendId]?.length > 0) {
                    this.socketUsers[res?.friendId]?.map(async (id) => {
                        await this.server.to(id).emit('receivedCallSuccess', res);
                    });
                }
            });
            await client.on('offer', (res) => {
                if (this.socketUsers[res?.friend]?.length > 0) {
                    this.socketUsers[res?.friend]?.map(async (id) => {
                        await this.server.to(id).emit('offer', res);
                    });
                }
            });
            await client.on('answer', (res) => {
                if (this.socketUsers[res?.friend]?.length > 0) {
                    this.socketUsers[res?.friend]?.map(async (id) => {
                        await this.server.to(id).emit('answer', res);
                    });
                }
            });
            await client.on('icecandidate', (res) => {
                if (this.socketUsers[res?.friend]?.length > 0) {
                    this.socketUsers[res?.friend]?.map(async (id) => {
                        await this.server.to(id).emit('icecandidate', res.candidate);
                    });
                }
            });
            await client.on('screen-sharing', res => {
                if (this.socketUsers[res?.friend]?.length > 0) {
                    this.socketUsers[res?.friend]?.map(async (id) => {
                        await this.server.to(id).emit('screen-sharing', res.isSharing);
                    });
                }
            });
        }
    }
    async handleDisconnect(client) {
        const userId = (await client.handshake.query.myId);
        this.socketUsers[userId] = this.socketUsers[userId].filter((socketId) => socketId !== client.id);
        if (this.socketUsers[userId].length === 0) {
            delete this.socketUsers[userId];
        }
    }
};
exports.NotificationsGateway = NotificationsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationsGateway.prototype, "server", void 0);
exports.NotificationsGateway = NotificationsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            allowedHeaders: '*',
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    }),
    (0, websockets_1.WebSocketGateway)({
        cors: {
            allowedHeaders: '*',
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [])
], NotificationsGateway);
//# sourceMappingURL=socket-server.gateway.js.map