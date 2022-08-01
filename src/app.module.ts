import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DropBoxModule } from './drop-box/drop-box.module';

@Module({
  imports: [DropBoxModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
