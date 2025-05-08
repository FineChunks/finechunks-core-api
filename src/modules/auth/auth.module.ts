import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '../../core/strategies/local.strategy';
import { JwtStrategy } from '../../core/strategies/jwt.strategy';
import jwtConfig from '../../config/jwt.config';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: jwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
