import { IsUserEmail, IsUserPassword } from '@/decorators/validation.decorator'
import { ApiProperty } from '@nestjs/swagger'

export class SignInDto {
  @ApiProperty({
    example: 'user@example.com',
    description: '로그인에 사용할 이메일입니다.',
  })
  @IsUserEmail()
  email: string

  @ApiProperty({
    example: 'Password123!',
    description: '로그인에 사용할 비밀번호입니다.',
  })
  @IsUserPassword()
  password: string
}
