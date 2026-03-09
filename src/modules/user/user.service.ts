import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Logger } from 'nestjs-pino'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './user.entitiy'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly logger: Logger,
  ) {}

  async findAllUsers() {
    return this.userRepository.find()
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto)
    await this.userRepository.save(user)
    this.logger.log('사용자 계정 생성 완료', { userId: user.id })
    return user
  }

  async isEmailAvailable(email: string): Promise<boolean> {
    const isEmailExists = await this.userRepository.existsBy({ email })
    return !isEmailExists
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.')
    }

    return user
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOneBy({ email })
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto)
    return this.findUserById(id)
  }

  async removeUser(id: string) {
    const userToRemove = await this.findUserById(id)
    await this.userRepository.remove(userToRemove)
    this.logger.log('사용자 계정 삭제 완료', { userId: id })
  }
}
