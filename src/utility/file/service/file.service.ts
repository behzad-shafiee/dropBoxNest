import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { join } from 'path';
import { Dropbox } from 'dropbox';
import { DownlaodDto } from '../dto/download.dto';
import { UplaodDto } from '../dto/upload.dto';
import { Response } from '../../../common/class/response.class';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ResponseFileDto } from '../response/response.file.dto';
import { KeyDto } from '../dto/key.dto';
import { AnyAaaaRecord } from 'dns';
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

  async uploadFile(uplaodDto: UplaodDto, file: Express.Multer.File) {
    try {
      if (!file) {
        throw new BadRequestException();
      }
      const dbx = new Dropbox({ accessToken: uplaodDto.access_token });
      const fileName = file.filename;
      const pathFile = join(__dirname, `../../../../temp/${fileName}`);
      const contents = await fs.readFileSync(pathFile);
      const res = await dbx.filesUpload({ path: `/${fileName}`, contents });
      const link: any = await dbx.sharingCreateSharedLinkWithSettings({
        path: res.result.path_display,
      });

      const { status, ...remain } = res;
      this.deleteImg(pathFile);

      return new ResponseFileDto(
        res.status,
        true,
        'image uploaded on dropBox successfully',
        '',
        link.result.url,
        '',
        remain,
      );
    } catch (e) {
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

      await fs.writeFileSync(pathFile, data.result.fileBinary);
      //  await this.redisService.setKey(hadshedPath,'downloadedUrlImg', 600000);
      const response = new ResponseFileDto(
        201,
        true,
        'file downloaded successfully',
        hadshedPath,
        '',
        '',
        null,
      );

      return response;
    } catch (e) {
      return e;
      // const result = await HandlerError.errorHandler(e);
      // await this.handlerService.handlerException400('FA', result);
    }
  }

  async getUrlImg(keyDto: KeyDto) {
    try {
      const url: any = await this.redisService.getKey(keyDto);
      const response = new ResponseFileDto(
        HttpStatus.CREATED,
        true,
        '',
        '',
        '',
        'url',
        null,
      );
      return response;
    } catch (e) {
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }
}
