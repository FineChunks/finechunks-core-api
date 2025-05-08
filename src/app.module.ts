import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [typeOrmConfig, jwtConfig],
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
