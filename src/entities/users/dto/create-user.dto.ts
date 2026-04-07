import { IsEmail, IsEnum, IsHash, IsNotEmpty, IsString } from 'class-validator';
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

  @IsHash('sha256')
  @IsNotEmpty()
  password: string;
}
