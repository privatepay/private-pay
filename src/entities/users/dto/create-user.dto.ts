import { Role } from '@/types/auth.interface';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { IDocumentType } from 'src/types/user.interface';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  document: string;

  @IsEnum(IDocumentType)
  @IsNotEmpty()
  documentType: IDocumentType;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
