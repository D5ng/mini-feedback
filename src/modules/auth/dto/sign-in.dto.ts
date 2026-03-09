import { IsUserEmail, IsUserPassword } from '@/decorators/validation.decorator'

export class SignInDto {
  @IsUserEmail()
  email: string

  @IsUserPassword()
  password: string
}
