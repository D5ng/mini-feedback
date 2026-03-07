import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty', options: { colorize: true } } : undefined,
        redact: {
          paths: ['req.headers.authorization', 'req.body.password', 'req.body.token'],
          censor: '***PRIVATE***',
        },

        genReqId: (req) => req.headers['x-request-id'] || crypto.randomUUID(),

        customLogLevel: (res, err) => {
          const statusCode = res?.statusCode ?? 500

          if (statusCode >= 500 || err) {
            return 'error'
          }

          if (statusCode >= 400) {
            return 'warn'
          }

          return 'info'
        },
      },
    }),
  ],
})
export class LoggingModule {}
