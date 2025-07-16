import { Module } from '@nestjs/common';
import { SaveuserquestionincollectionsService } from './saveuserquestionincollections.service';
import { SaveuserquestionincollectionsController } from './saveuserquestionincollections.controller';

@Module({
  controllers: [SaveuserquestionincollectionsController],
  providers: [SaveuserquestionincollectionsService],
})
export class SaveuserquestionincollectionsModule {}
