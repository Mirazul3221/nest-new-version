import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection } from '@nestjs/websockets';
import { SocketServerService } from './socket-server.service';
import { CreateSocketServerDto } from './dto/create-socket-server.dto';
import { UpdateSocketServerDto } from './dto/update-socket-server.dto';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors : {
    allowedHeaders: '*',
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  }
})
export class SocketServerGateway implements OnGatewayConnection {
  constructor(private readonly socketServerService: SocketServerService) {}

  handleConnection(client: Socket) {
    console.log("user id is :" + client.handshake.query.userId)
    client.on('alert-message',m=>{
      client.emit("send-msg",m)
    })
  }


  @SubscribeMessage('createSocketServer')
  create(@MessageBody() createSocketServerDto: CreateSocketServerDto) {
    return this.socketServerService.create(createSocketServerDto);
  }

  @SubscribeMessage('findAllSocketServer')
  findAll() {
    return this.socketServerService.findAll();
  }

  @SubscribeMessage('findOneSocketServer')
  findOne(@MessageBody() id: number) {
    return this.socketServerService.findOne(id);
  }

  @SubscribeMessage('updateSocketServer')
  update(@MessageBody() updateSocketServerDto: UpdateSocketServerDto) {
    return this.socketServerService.update(updateSocketServerDto.id, updateSocketServerDto);
  }

  @SubscribeMessage('removeSocketServer')
  remove(@MessageBody() id: number) {
    return this.socketServerService.remove(id);
  }
}
