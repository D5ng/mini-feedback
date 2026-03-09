import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'
import { GlobalExceptionFilter } from './filters/global-exception-filter'
import { BaseResponseInterceptor } from './interceptors/base-response.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  })

  app.use(cookieParser())
  app.useLogger(app.get(Logger))

  app.useGlobalInterceptors(new BaseResponseInterceptor())
  app.useGlobalFilters(new GlobalExceptionFilter())
  await app.listen(process.env.PORT || 8080)
}

bootstrap().catch(console.error)
