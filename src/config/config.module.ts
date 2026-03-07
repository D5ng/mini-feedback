import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import typeormConfig from './typeorm.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [typeormConfig],
    }),
  ],
})
export class AppConfigModule {}
