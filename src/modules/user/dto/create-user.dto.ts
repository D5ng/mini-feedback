import { IsUserEmail, IsUserNickname, IsUserPassword } from '@/decorators/validation.decorator'

export class CreateUserDto {
  @IsUserEmail()
  email: string

  @IsUserPassword()
  password: string

  @IsUserNickname()
  nickname: string
}
