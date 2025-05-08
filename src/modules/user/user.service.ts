import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(userDto.password, 10);
    const user = this.userRepository.create({ ...userDto, password: hash });
    return this.userRepository.save(user);
  }

  findAll(options?: FindManyOptions<User>) {
    return this.userRepository.find(options);
  }

  findOne(id: string, options?: FindOneOptions<User>) {
    return this.userRepository.findOne({ where: { id }, ...options });
  }

  findOneByEmail(email: string, options?: FindOneOptions<User>) {
    return this.userRepository.findOne({ where: { email }, ...options });
  }

  findOneByUsername(username: string, options?: FindOneOptions<User>) {
    return this.userRepository.findOne({ where: { username }, ...options });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto).then(() => {
      return this.findOne(id);
    });
  }

  remove(id: string) {
    return this.userRepository.delete(id).then(() => {
      return { deleted: true };
    });
  }
}
