import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { user_model, user_schema } from './schema/auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { jwtStrategy } from './jwt.stratigy';
import { FacebookStrategy } from './facebook.strategy';
import { GoogleStrategy } from './google.strategy';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { FriendRequestModule } from 'src/friend-request/friend-request.module';
import { LoginstatusModule } from 'src/loginstatus/loginstatus.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    NestjsFormDataModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('jwt_secret'),
          signOptions: {
            expiresIn: config.get<string | number>('jwt_exp'),
          },
        };
      },
    }),
    MongooseModule.forFeature([
      {
        name: user_model,
        schema: user_schema,
      },
    ]),
    forwardRef(() => FriendRequestModule), // Fix circular dependency
    forwardRef(() => LoginstatusModule), // Fix circular dependency
    MailModule
  ],
  controllers: [AuthController],
  providers: [AuthService, jwtStrategy, FacebookStrategy, GoogleStrategy],
  exports: [
    PassportModule,
    AuthService,
    MongooseModule.forFeature([
      {
        name: user_model,
        schema: user_schema,
      },
    ]),
  ],
})
export class AuthModule {}
