import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwaggerConfigModule } from './config/swagger/swagger.module';
import { FileModule } from './utility/file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisModule } from './utility/redis/redis.module';
import { HandlerModule } from './utility/handler/handler.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TranslateModule } from './utility/translate/translate.module';

require('dotenv').config;

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    SwaggerConfigModule,
    TranslateModule,
    FileModule,
    RedisModule,
    HandlerModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
