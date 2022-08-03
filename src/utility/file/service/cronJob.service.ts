import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
const fs = require('fs');

@Injectable()
export class CronJobService {
    @Cron('3 * * * * *',{name:'deleteImg'})
    async deleteImg() {
      try {
        console.log('path');
      //   const result = await fs.unlinkSync(path);
      //   console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
}
