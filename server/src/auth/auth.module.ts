import { Module } from '@nestjs/common';
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

@Module({
  imports:[
    NestjsFormDataModule,
    PassportModule.register({
      defaultStrategy:"jwt"
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
    // JwtModule.register({
    //   global: true,
    //   secret: "mirazul",
    //   signOptions: { expiresIn: '60s' },
    // }),
    MongooseModule.forFeature([
      {
        name: user_model,
        schema: user_schema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService,jwtStrategy,FacebookStrategy,GoogleStrategy],
  exports : [PassportModule,AuthService]
})
export class AuthModule {}
