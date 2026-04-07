import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsHash,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { IDocumentType } from 'src/types/user.interface';

export class User {
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

  @IsHash('sha256')
  @IsNotEmpty()
  password: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
