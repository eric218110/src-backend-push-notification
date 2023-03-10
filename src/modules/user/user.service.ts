import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { Prisma } from '@prisma/client';
import { ErrorHandler } from './../../shared/error/error.handler';
import { PrismaService } from './../../shared/infra/prisma/prisma.service';
import { UserMapper } from './user.mapper';
import { CreateNewUserBody, FindOneUser, ListOneUserById } from './user.model';

@Injectable()
export class UserService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly userMapper: UserMapper,
  ) { }

  public async registerOneUser(body: CreateNewUserBody): Promise<{ id: number } | ErrorHandler> {
    try {
      const data = await this.userMapper.createNewUserBodyToUserCreateInput(body)
      const { id } = await this.prisma.user.create({ data })
      return { id }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new HttpException(`email ${body.email} already exists`, HttpStatus.FORBIDDEN)
      }
      throw new HttpException('Not possible create user', HttpStatus.SERVICE_UNAVAILABLE)
    }
  }

  public async readUserById(id: number): Promise<ListOneUserById | ErrorHandler> {
    const findOneUser = await this.prisma.user.findUniqueOrThrow({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        phone_number: true,
        auth: { select: { password: true, email: true } },
        company: { select: { company_address: true, company_name: true } }
      }
    }).catch((e) => {
      console.log(e)
      return null
    })

    if (!findOneUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return this.userMapper.findUserToListOneUserById(findOneUser as FindOneUser)

  }
}
