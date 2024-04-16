import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async create(user: CreateUserDto) {
    const hashedPassword = await this.authService.generateHashedPassword(
      user.password,
    );
    user.password = hashedPassword;
    const { password, ...newUser } = await this.userRepository.save(user);
    return newUser;
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.getUser(id);
  }

  async update(id: number, user: UpdateUserDto) {
    const userToUpdate = await this.getUser(id);
    userToUpdate.username = user.username;
    return this.userRepository.save(userToUpdate);
  }

  async remove(id: number) {
    const userToRemove = await this.getUser(id);
    return this.userRepository.remove(userToRemove);
  }

  async findByName(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  private async getUser(id: number) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new HttpException('user not exists', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
