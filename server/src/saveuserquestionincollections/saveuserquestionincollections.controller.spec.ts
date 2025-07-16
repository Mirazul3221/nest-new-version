import { Test, TestingModule } from '@nestjs/testing';
import { SaveuserquestionincollectionsController } from './saveuserquestionincollections.controller';
import { SaveuserquestionincollectionsService } from './saveuserquestionincollections.service';

describe('SaveuserquestionincollectionsController', () => {
  let controller: SaveuserquestionincollectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaveuserquestionincollectionsController],
      providers: [SaveuserquestionincollectionsService],
    }).compile();

    controller = module.get<SaveuserquestionincollectionsController>(SaveuserquestionincollectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
