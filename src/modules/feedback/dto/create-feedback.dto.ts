import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class CreateFeedbackDto {
  @IsString({ message: '제목은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '제목은 필수 입력 항목입니다.' })
  title: string

  @IsString({ message: '내용은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '내용은 필수 입력 항목입니다.' })
  content: string

  @IsBoolean({ message: '공개 여부는 불리언 값이어야 합니다.' })
  isPublic: boolean = true

  @IsNotEmpty({ message: '수신자 ID는 필수 입력 항목입니다.' })
  receiverId: string
}
