import { IsUserEmail } from '@/decorators/validation.decorator'
import { ApiProperty } from '@nestjs/swagger'

export class CheckEmailAvailabilityDto {
  @ApiProperty({
    example: 'user@example.com',
    description: '중복 여부를 확인할 이메일입니다.',
  })
  @IsUserEmail()
  email: string
}

