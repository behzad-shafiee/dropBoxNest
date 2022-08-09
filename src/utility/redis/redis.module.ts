import {
  CacheModule,
  CACHE_MANAGER,
  DynamicModule,
  Global,
  Module,
} from '@nestjs/common';
import { RedisService } from './redis.service';

const redisStore = require('cache-manager-ioredis');

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {

}
