import { Body, Controller, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserService } from '../user/user.service'
import { AuthService } from './auth.service'
import { CheckEmailAvailabilityDto } from './dto/check-email-availability.dto'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  @ApiOperation({
    summary: '회원가입',
    description: '이메일, 비밀번호, 닉네임으로 회원가입을 수행합니다.',
  })
  @ApiCreatedResponse({
    description: '회원가입이 정상적으로 완료되었습니다.',
  })
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto)
  }

  @Post('signin')
  @ApiOperation({
    summary: '로그인',
    description: '이메일과 비밀번호로 로그인하고 액세스/리프레시 토큰을 발급합니다.',
  })
  @ApiOkResponse({
    description: '로그인이 정상적으로 완료되었습니다.',
  })
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }

  @Post('checkEmailAvailability')
  @ApiOperation({
    summary: '이메일 중복 확인',
    description: '입력한 이메일이 가입에 사용 가능한지 확인합니다.',
  })
  @ApiOkResponse({
    description: '이메일 사용 가능 여부가 정상적으로 확인되었습니다.',
  })
  async checkEmailAvailability(@Body() dto: CheckEmailAvailabilityDto) {
    return this.userService.isEmailAvailable(dto.email)
  }
}
