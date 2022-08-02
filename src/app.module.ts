import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwaggerConfigModule } from './config/swagger/swagger.module';
import { FileModule } from './utility/file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './utility/file/entity/file.entity';
import { CommonTypeOrmModuleOptions } from './config/database/common-type-orm.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

require('dotenv').config;

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot(CommonTypeOrmModuleOptions),
    SwaggerConfigModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
