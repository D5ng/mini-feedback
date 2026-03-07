import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppConfigModule } from './config/config.module'
import { LoggingModule } from './config/logger.module'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [AppConfigModule, DatabaseModule, LoggingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
