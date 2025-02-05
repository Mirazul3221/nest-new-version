import { OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class NotificationsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor();
    server: Server;
    afterInit(server: Server): void;
    private onlineUsers;
    private socketUsers;
    connectedUsesrs: (socketId: any, userId: any) => Promise<void>;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
}
