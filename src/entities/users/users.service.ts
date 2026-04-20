import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: [
        { email: createUserDto.email },
        { document: createUserDto.document },
      ],
    });

    if (existingUser) {
      throw new ConflictException(
        'User with this email or document already exists',
      );
    }

    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: [
        'id',
        'email',
        'password',
        'firstName',
        'lastName',
        'document',
        'documentType',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.userRepository.delete(id);
  }
}
