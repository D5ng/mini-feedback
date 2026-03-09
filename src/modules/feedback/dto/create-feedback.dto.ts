import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class CreateFeedbackDto {
  @ApiProperty({
    example: '고마워요!',
    description: '피드백 제목입니다.',
  })
  @IsString({ message: '제목은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '제목은 필수 입력 항목입니다.' })
  title: string

  @ApiProperty({
    example: '프로젝트 도와줘서 정말 고마웠어요.',
    description: '피드백 내용입니다.',
  })
  @IsString({ message: '내용은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '내용은 필수 입력 항목입니다.' })
  content: string

  @ApiProperty({
    example: true,
    description: '다른 유저에게 공개할지 여부입니다.',
    default: true,
  })
  @IsBoolean({ message: '공개 여부는 불리언 값이어야 합니다.' })
  isPublic: boolean = true

  @ApiProperty({
    example: 'a3b7f1a0-2e4a-4a3d-9c1c-5f3e2d1b0c9f',
    description: '피드백을 받는 유저의 ID입니다.',
    format: 'uuid',
  })
  @IsNotEmpty({ message: '수신자 ID는 필수 입력 항목입니다.' })
  receiverId: string
}
