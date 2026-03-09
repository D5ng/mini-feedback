import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppConfigModule } from './config/config.module'
import { LoggingModule } from './config/logger.module'
import { DatabaseModule } from './database/database.module'
import { AuthModule } from './modules/auth/auth.module'
import { FeedbackModule } from './modules/feedback/feedback.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [AppConfigModule, DatabaseModule, LoggingModule, AuthModule, UserModule, FeedbackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
