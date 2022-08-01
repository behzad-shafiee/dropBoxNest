import { Module } from '@nestjs/common';
import { DropBoxService } from './drop-box.service';
import { DropBoxController } from './drop-box.controller';

@Module({
  controllers: [DropBoxController],
  providers: [DropBoxService]
})
export class DropBoxModule {}
