import {
  CACHE_MANAGER,
  INestApplication,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Logger as NestLogger } from '@nestjs/common/services/logger.service';
import { Cache, Store } from 'cache-manager';
const redisStore = require('cache-manager-ioredis');

@Injectable()
export class RedisService {
  nestLogger: any = undefined;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.nestLogger = new NestLogger('Redis_Logger');
  }
  async setKeyNoExpire(key: string, value: string) {
    await this.cacheManager.set(key, value, { ttl: 0 });
  }
  async setKey(key: string, value: string, ttl?: number) {
    await this.cacheManager.set(key, value, { ttl: ttl });
  }
  async getKey(key: string): Promise<Record<string, any>> {
    return await this.cacheManager.get<string>(key);
     
  }
  async delKey(key: string): Promise<Object> {
    return await this.cacheManager.del(key);

  }

  async connect() {}
}
