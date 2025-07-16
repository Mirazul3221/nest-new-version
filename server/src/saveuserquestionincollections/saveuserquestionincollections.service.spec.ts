import { Test, TestingModule } from '@nestjs/testing';
import { SaveuserquestionincollectionsService } from './saveuserquestionincollections.service';

describe('SaveuserquestionincollectionsService', () => {
  let service: SaveuserquestionincollectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaveuserquestionincollectionsService],
    }).compile();

    service = module.get<SaveuserquestionincollectionsService>(SaveuserquestionincollectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
