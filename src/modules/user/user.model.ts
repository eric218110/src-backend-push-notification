import { Company } from '@prisma/client';
import { Auth } from '@prisma/client';
import { User } from '@prisma/client';
import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateNewUserBody {

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  company_name: string;

  @IsOptional()
  phone_number: string;

  @IsOptional()
  company_address: string;
}

export class ListOneUserById {
  id: number
  email: string
  name: string
  company_name: string
  phone_number: string
  company_address: string
  password: string
}

export class FindOneByIdPath {
  id: string
}

export type FindOneUser = User & {
  auth: Auth,
  company: Company
}
