import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface BaseResponse<T> {
  success: boolean
  timestamp: string
  path: string
  data: T | null
}

@Injectable()
export class BaseResponseInterceptor<T> implements NestInterceptor<T, BaseResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<BaseResponse<T>> {
    const request = context.switchToHttp().getRequest<Request>()

    return next.handle().pipe(
      map((data: T) => ({
        success: true,
        timestamp: new Date().toISOString(),
        path: request.url,
        data: data ?? null,
      })),
    )
  }
}
