import { Module } from '@nestjs/common';
import { UsermemoryService } from './usermemory.service';
import { UsermemoryController } from './usermemory.controller';
import { AuthModule } from 'src/auth/auth.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { MongooseModule } from '@nestjs/mongoose';
import { memorySchema, UserMemory } from './schema/memorySchema';

@Module({
  imports:[AuthModule,NestjsFormDataModule, MongooseModule.forFeature([{ name: UserMemory.name, schema: memorySchema }])],
  controllers: [UsermemoryController],
  providers: [UsermemoryService],
})
export class UsermemoryModule {}
