import { Inject, Injectable } from '@nestjs/common';
import { join } from 'path';
import { Dropbox } from 'dropbox';
import { DownlaodDto } from '../dto/download.dto';
import { UplaodDto } from '../dto/upload.dto';
import { Response } from '../../../common/class/response.class';
import { SchedulerRegistry } from '@nestjs/schedule';
// import { RedisService } from '../../redis/redis.service';

const fs = require('fs');
const bcrypt = require('bcrypt');

@Injectable()
export class FileService {
  constructor(
    // @Inject(RedisService)
    // private readonly redisService: RedisService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async deleteImg(path: string) {
    try {
      await fs.unlinkSync(path);
    } catch (error) {
      console.log(error);
    }
  }

  async uploadFile(file: Express.Multer.File, uplaodDto: UplaodDto) {
    try {
      if (!file) {
        return {
          statusCode: 400,
          message: ['file should not be empty'],
          error: 'Bad Request',
        };
      }
      const dbx = new Dropbox({ accessToken: uplaodDto.access_token });
      const fileName = file.filename;
      const pathFile = join(__dirname, `../../../../temp/${fileName}`);
      const contents = await fs.readFileSync(pathFile);
      const res = await dbx.filesUpload({ path: `/${fileName}`, contents });
      const { result, status, ...remain } = res;
      const response = new Response(
        result,
        {
          statusCode: status,
          succeed: true,
          message: 'image uploaded on dropBox successfully',
        },
        remain,
      );

      this.deleteImg(pathFile);

      return response;
    } catch (e) {
      console.log(e);
      return e;

      // const result = await HandlerError.errorHandler(e);
      // await this.handlerService.handlerException400('FA', result);
    }
  }

  async downloadFile(downloadDto: DownlaodDto) {
    try {
      const dbx = new Dropbox({
        accessToken: downloadDto.access_token,
      });
      const data: any = await dbx.sharingGetSharedLinkFile({
        url: downloadDto.url,
      });

      const fileName = data.result.name;
      const pathFile = join(
        __dirname,
        `../../../../public/downloads/${fileName}`,
      );
      const pathList = await fs.readdirSync(
        join(__dirname, `../../../../public/downloads/`),
      );

      const path = `/downloads/${fileName}`;
      const salt = await bcrypt.genSalt(8);
      const hadshedPath = await bcrypt.hash(path, salt);

      for (const path of pathList) {
        if (path === fileName) {
          const response = new Response(
            null,
            {
              statusCode: 200,
              succeed: true,
              message: 'image already downloaded from dropBox',
            },
            null,
          );
          return response;
        }
      }

      await fs.writeFileSync(pathFile, data.result.fileBinary);
      const response = new Response(
        hadshedPath,
        {
          statusCode: 201,
          succeed: true,
          message: 'image downloaded from dropBox successfully',
        },
        null,
      );
      //  await this.redisService.setKey(hadshedPath,'downloadedUrlImg', 600000);
      return response;
    } catch (e) {
      // const result = await HandlerError.errorHandler(e);
      // await this.handlerService.handlerException400('FA', result);
    }
  }

  // async getUrlImg(key: string): Promise<string> {
  //   try {
  //     const url: any = await this.redisService.getKey(key);
  //     return url;
  //   } catch (e) {
  //     const result = await HandlerError.errorHandler(e);
  //     await this.handlerService.handlerException400('FA', result);
  //   }
  // }
}
