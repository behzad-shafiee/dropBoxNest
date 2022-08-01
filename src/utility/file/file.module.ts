import { forwardRef, Module } from '@nestjs/common';
import { FileService } from './service/file.service';
import { FileController } from './controller/file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { FileEntity } from './entity/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
    // TypeOrmModule.forFeature([FileRepository]),
    // ScheduleModule.forRoot(),
  ],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
