import { forwardRef, Module } from '@nestjs/common';
import { LoginstatusService } from './loginstatus.service';
import { LoginstatusController } from './loginstatus.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema, SessionSchemaName } from './schema/schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SessionSchemaName,
        schema: SessionSchema,
      },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [LoginstatusController],
  providers: [LoginstatusService],
  exports: [MongooseModule], // ✅ This is critical!
})
export class LoginstatusModule {}
