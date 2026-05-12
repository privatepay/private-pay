import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly i18n: I18nService,
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
        this.i18n.t('index.users.USER_ALREADY_EXISTS'),
      );
    }

    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return { message: this.i18n.t('index.users.CREATE_SUCCESS'), data: user };
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(
        this.i18n.t('index.users.USER_NOT_FOUND', { args: { id } }),
      );
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
        'codename',
        'document',
        'documentType',
        'language',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(
        this.i18n.t('index.users.USER_NOT_FOUND', { args: { id } }),
      );
    }

    await this.userRepository.update(id, updateUserDto);
    return { message: this.i18n.t('index.users.UPDATE_SUCCESS'), data: user };
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(
        this.i18n.t('index.users.USER_NOT_FOUND', { args: { id } }),
      );
    }

    await this.userRepository.delete(id);
    return { message: this.i18n.t('index.users.DELETE_SUCCESS') };
  }

  async changeLanguage(id: string, language: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(
        this.i18n.t('index.users.USER_NOT_FOUND', { args: { id } }),
      );
    }

    if (language !== 'pt-BR' && language !== 'en') {
      throw new BadRequestException(
        this.i18n.t('index.language.INVALID_LANGUAGE', { args: { language } }),
      );
    }

    if (user.language === 'pt-BR') {
      language = 'en';
    } else if (user.language === 'en') {
      language = 'pt-BR';
    }

    await this.userRepository.update(id, { language });
    return { message: this.i18n.t('index.language.LANGUAGE_CHANGED') };
  }
}

