import { CacheModule, Module } from '@nestjs/common';
import { FileService } from './service/file.service';
import { FileController } from './controller/file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { RedisModule } from '../redis/redis.module';
import { HandlerModule } from '../handler/handler.module';

@Module({
  imports: [
    RedisModule,
    HandlerModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
  ],
  providers: [FileService,],
  controllers: [FileController],
})
export class FileModule {}
