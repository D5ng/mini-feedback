import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
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

  const config = new DocumentBuilder()
    .setTitle('API Experimental')
    .setDescription('API Experimental 서비스의 REST API 문서입니다.')
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      in: 'header',
    })
    .build()

  const swaggerDocument = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, swaggerDocument)

  app.useGlobalInterceptors(new BaseResponseInterceptor())
  app.useGlobalFilters(new GlobalExceptionFilter())
  await app.listen(process.env.PORT || 8080)
}

bootstrap().catch(console.error)
