import {
  BadRequestException,
  CACHE_MANAGER,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { join } from 'path';
import { Dropbox } from 'dropbox';
import { DownlaodDto } from '../dto/download.dto';
import { UplaodDto } from '../dto/upload.dto';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { ResponseFileDto } from '../response/response.file.dto';
import { KeyDto } from '../dto/key.dto';
import { AnyAaaaRecord } from 'dns';
import { HandlerError } from 'src/common/class/handler.error';
import { HandlerService } from '../../../utility/handler/handler.service';
import { RedisService } from '../../redis/redis.service';
import { Cache, Store } from 'cache-manager';
const fs = require('fs');
const bcrypt = require('bcrypt');

@Injectable()
export class FileService {
  constructor(
    private redisService: RedisService,
    private schedulerRegistry: SchedulerRegistry,
    private handlerService: HandlerService,
  ) {}

  @Cron('* 1 * * * *', { name: 'deleteFile' })
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
        const error = new BadRequestException({
          message: 'file field must fill',
        });
        return error;
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

      const response= new ResponseFileDto(
        res.status,
        true,
        'image uploaded on dropBox successfully',
        '',
        link.result.url,
        '',
        remain,
      );
      
      return response
    } catch (e) {
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
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
      await this.redisService.setKey(
        hadshedPath,
        `/downloads/${fileName}`,
        600000,
      );
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
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }

  async getUrlImg(keyDto: KeyDto) {
    try {
      if (!keyDto.redisKey) {
        throw new BadRequestException();
      }
      const url: any = await this.redisService.getKey(keyDto.redisKey);
      console.log(url);
      if (url === null) {
        const response = new ResponseFileDto(
          HttpStatus.CREATED,
          true,
          '',
          '',
          '',
          'your redisKey is wrong',
          null,
        );
        return response;
      } else {
        const response = new ResponseFileDto(
          HttpStatus.CREATED,
          true,
          '',
          '',
          '',
          url,
          null,
        );
        return response;
      }
    } catch (e) {
      console.log(e);
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }
}
