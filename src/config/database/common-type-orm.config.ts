import { FileEntity } from 'src/utility/file/entity/file.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

export const CommonTypeOrmModuleOptions:TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: +process.env.DB_PORT,
  username: 'postgres',
  password: process.env.DB_PASS,
  database: 'postgres',
  entities: [FileEntity],
  synchronize: true,
};
