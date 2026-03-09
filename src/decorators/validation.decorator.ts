import { applyDecorators } from '@nestjs/common'
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator'

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export function IsUserEmail() {
  return applyDecorators(
    IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' }),
    IsNotEmpty({ message: '이메일은 필수 입력 항목입니다.' }),
  )
}

export function IsUserPassword() {
  return applyDecorators(
    IsString({ message: '비밀번호는 문자열이어야 합니다.' }),
    IsNotEmpty({ message: '비밀번호는 필수 입력 항목입니다.' }),
    MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
    MaxLength(20, { message: '비밀번호는 최대 20자 이하여야 합니다.' }),
    Matches(PASSWORD_REGEX, {
      message: '비밀번호는 최소 8자 이상이어야 하며, 최소 하나의 소문자, 대문자, 숫자, 특수문자를 포함해야 합니다.',
    }),
  )
}

export function IsUserNickname() {
  return applyDecorators(
    IsString({ message: '닉네임은 문자열이어야 합니다.' }),
    IsNotEmpty({ message: '닉네임은 필수 입력 항목입니다.' }),
    MinLength(3, { message: '닉네임은 최소 3자 이상이어야 합니다.' }),
    MaxLength(20, { message: '닉네임은 최대 20자 이하여야 합니다.' }),
  )
}
