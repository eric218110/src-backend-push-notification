import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateNewUserBody, FindOneByIdPath } from './user.model';
import { Get, Param } from '@nestjs/common/decorators';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('users/register')
  createUser(@Body() body: CreateNewUserBody) {
    return this.userService.registerOneUser(body);
  }

  @Get('users/:id')
  readUserById(@Param() { id }: FindOneByIdPath) {
    return this.userService.readUserById(Number(id));
  }
}
