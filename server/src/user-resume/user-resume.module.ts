import { Module } from '@nestjs/common';
import { UserResumeService } from './user-resume.service';
import { UserResumeController } from './user-resume.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CV, CVSchema } from './schema/user-resume-schema';

@Module({
    imports:[AuthModule,
      MongooseModule.forFeature([
        {name:CV.name,
          schema : CVSchema
        }
    ]),
    ],
  controllers: [UserResumeController],
  providers: [UserResumeService],
})
export class UserResumeModule {}
