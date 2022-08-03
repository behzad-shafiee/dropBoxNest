import { forwardRef, Module } from '@nestjs/common';
import { FileService } from './service/file.service';
import { FileController } from './controller/file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronJobService } from './service/cronJob.service';


@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
  ],
  providers: [FileService,CronJobService],
  controllers: [FileController],
})
export class FileModule {}
