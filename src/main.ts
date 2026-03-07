import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { GlobalExceptionFilter } from './filters/global-exception-filter'
import { BaseResponseInterceptor } from './interceptors/base-response.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  })

  app.useGlobalInterceptors(new BaseResponseInterceptor())
  app.useGlobalFilters(new GlobalExceptionFilter())
  await app.listen(process.env.PORT || 8080)
}

bootstrap().catch(console.error)
