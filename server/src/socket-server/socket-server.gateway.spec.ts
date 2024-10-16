import { Test, TestingModule } from '@nestjs/testing';
import { SocketServerGateway } from './socket-server.gateway';
import { SocketServerService } from './socket-server.service';

describe('SocketServerGateway', () => {
  let gateway: SocketServerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketServerGateway, SocketServerService],
    }).compile();

    gateway = module.get<SocketServerGateway>(SocketServerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
