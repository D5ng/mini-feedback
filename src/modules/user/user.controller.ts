import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'

@ApiTags('유저')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: '유저 목록 조회',
    description: '가입된 모든 유저 목록을 조회합니다.',
  })
  @ApiOkResponse({
    description: '유저 목록이 정상적으로 반환되었습니다.',
  })
  async fetchAllUsers() {
    return this.userService.findAllUsers()
  }

  @Post('')
  @ApiOperation({
    summary: '유저 생성',
    description: '이메일, 비밀번호, 닉네임으로 새로운 유저를 생성합니다.',
  })
  @ApiCreatedResponse({
    description: '유저가 정상적으로 생성되었습니다.',
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto)
  }

  @Get(':id')
  @ApiOperation({
    summary: '유저 상세 조회',
    description: 'ID로 특정 유저의 상세 정보를 조회합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '조회할 유저의 ID입니다.',
  })
  @ApiOkResponse({
    description: '유저 상세 정보가 정상적으로 반환되었습니다.',
  })
  async fetchUserDetails(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findUserById(id)
  }

  @Delete(':id')
  @ApiOperation({
    summary: '유저 삭제',
    description: 'ID로 특정 유저를 삭제합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '삭제할 유저의 ID입니다.',
  })
  @ApiNoContentResponse({
    description: '유저가 정상적으로 삭제되었습니다.',
  })
  async removeUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.removeUser(id)
  }
}
