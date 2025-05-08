import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BearerPayloadDto } from './dto/bearer-payload.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email, { select: { id: true, username: true, password: true } });

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { id, username }: BearerPayloadDto = user;
      return this.jwtService.sign({ id, username });
    }

    return null;
  }

  async register(user: CreateUserDto) {
    const newUser = await this.userService.create(user);
    const { id, username }: BearerPayloadDto = newUser;
    return this.jwtService.sign({ id, username });
  }
}
