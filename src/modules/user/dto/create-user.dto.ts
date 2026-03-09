import { IsUserEmail, IsUserNickname, IsUserPassword } from '@/decorators/validation.decorator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: '유저의 고유 이메일입니다.',
  })
  @IsUserEmail()
  email: string

  @ApiProperty({
    example: 'Password123!',
    description: '비밀번호 정책을 만족하는 비밀번호입니다.',
  })
  @IsUserPassword()
  password: string

  @ApiProperty({
    example: '테스터',
    description: '다른 유저에게 표시되는 닉네임입니다.',
  })
  @IsUserNickname()
  nickname: string
}
