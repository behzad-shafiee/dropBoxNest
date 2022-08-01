import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwaggerConfigModule } from './config/swagger/swagger.module';
import { FileModule } from './utility/file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './utility/file/entity/file.entity';
import { CommonTypeOrmModuleOptions } from './config/database/common-type-orm.config';

require('dotenv').config;

@Module({
  imports: [
    TypeOrmModule.forRoot(CommonTypeOrmModuleOptions),
    SwaggerConfigModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
