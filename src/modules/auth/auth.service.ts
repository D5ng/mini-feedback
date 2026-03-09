import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import argon2 from 'argon2'
import { Logger } from 'nestjs-pino'
import { User } from '../user/user.entitiy'
import { UserService } from '../user/user.service'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const isEmailAvailable = await this.userService.isEmailAvailable(signUpDto.email)

    if (!isEmailAvailable) {
      throw new BadRequestException('이미 존재하는 이메일입니다.')
    }

    const hashedPassword = await this.hashFn(signUpDto.password)

    const newUser = await this.userService.createUser({ ...signUpDto, password: hashedPassword })

    const tokens = await this.generateTokens({ id: newUser.id, email: newUser.email, nickname: newUser.nickname })
    await this.updateUserRefreshToken(newUser.id, tokens.refreshToken)
    return tokens
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findUserByEmail(signInDto.email)

    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.')
    }

    const isPasswordValid = await argon2.verify(user.password, signInDto.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.')
    }

    const tokens = await this.generateTokens({ id: user.id, email: user.email, nickname: user.nickname })
    await this.updateUserRefreshToken(user.id, tokens.refreshToken)
    return tokens
  }

  async signOut(userId: string) {
    await this.userService.updateUser(userId, { refreshToken: null })
  }

  async updateUserRefreshToken(id: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashFn(refreshToken)
    await this.userService.updateUser(id, { refreshToken: hashedRefreshToken })
  }

  private async hashFn(data: string) {
    return argon2.hash(data)
  }

  private async generateTokens({ id, email, nickname }: Pick<User, 'id' | 'email' | 'nickname'>) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { id, email, nickname },
        { expiresIn: '15m', secret: this.configService.get<string>('JWT_ACCESS_SECRET')! },
      ),
      this.jwtService.signAsync(
        { id, email, nickname },
        { expiresIn: '7d', secret: this.configService.get<string>('JWT_REFRESH_SECRET')! },
      ),
    ])

    return { accessToken, refreshToken }
  }
}
