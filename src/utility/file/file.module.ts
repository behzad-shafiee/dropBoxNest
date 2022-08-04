import {  Module } from '@nestjs/common';
import { FileService } from './service/file.service';
import { FileController } from './controller/file.controller';
import { MulterModule } from '@nestjs/platform-express';
// import { RedisModule } from '../redis/redis.module';



@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
    // RedisModule,
  ],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
