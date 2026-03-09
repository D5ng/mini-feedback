import { JwtPayload, UserWithRefreshToken } from '@/types/jwt-payload.type'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly configService: ConfigService) {
    super({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req?.cookies?.['refreshToken']]),
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET')!,
      passReqToCallback: true,
    })
  }

  validate(req: Request, payload: JwtPayload): UserWithRefreshToken {
    const refreshToken = req.cookies?.['refreshToken'] as string | undefined

    if (!refreshToken) {
      throw new UnauthorizedException('리프레시 토큰을 찾을 수 없습니다.')
    }

    return { ...payload, refreshToken }
  }
}
