import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async fetchAllUsers() {
    return this.userService.findAllUsers()
  }

  @Post('')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto)
  }

  @Get(':id')
  async fetchUserDetails(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findUserById(id)
  }

  @Delete(':id')
  async removeUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.removeUser(id)
  }
}
