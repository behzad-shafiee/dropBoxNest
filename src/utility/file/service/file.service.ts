import {
  BadRequestException,
<<<<<<< HEAD
  CACHE_MANAGER,
=======
>>>>>>> ee55e186a9d713be03ef7f7079be07230b68cee9
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { join } from 'path';
import { Dropbox } from 'dropbox';
import { DownlaodDto } from '../dto/download.dto';
import { UplaodDto } from '../dto/upload.dto';
<<<<<<< HEAD
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { ResponseFileDto } from '../response/response.file.dto';
import { KeyDto } from '../dto/key.dto';
import { AnyAaaaRecord } from 'dns';
import { HandlerError } from 'src/common/class/handler.error';
import { HandlerService } from '../../../utility/handler/handler.service';
import { RedisService } from '../../redis/redis.service';
import { Cache, Store } from 'cache-manager';
=======
import { Response } from '../../../common/class/response.class';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ResponseFileDto } from '../response/response.file.dto';
import { KeyDto } from '../dto/key.dto';
import { AnyAaaaRecord } from 'dns';
// import { RedisService } from '../../redis/redis.service';
>>>>>>> ee55e186a9d713be03ef7f7079be07230b68cee9
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
<<<<<<< HEAD
        const error = new BadRequestException({
          message: 'file field must fill',
        });
        return error;
=======
        throw new BadRequestException();
>>>>>>> ee55e186a9d713be03ef7f7079be07230b68cee9
      }
      const dbx = new Dropbox({ accessToken: uplaodDto.access_token });
      const fileName = file.filename;
      const pathFile = join(__dirname, `../../../../temp/${fileName}`);
      const contents = await fs.readFileSync(pathFile);
      const res = await dbx.filesUpload({ path: `/${fileName}`, contents });
      const link: any = await dbx.sharingCreateSharedLinkWithSettings({
        path: res.result.path_display,
      });
<<<<<<< HEAD

      const { status, ...remain } = res;
=======
>>>>>>> ee55e186a9d713be03ef7f7079be07230b68cee9

      const { status, ...remain } = res;
      this.deleteImg(pathFile);

<<<<<<< HEAD
      const response= new ResponseFileDto(
=======
      return new ResponseFileDto(
>>>>>>> ee55e186a9d713be03ef7f7079be07230b68cee9
        res.status,
        true,
        'image uploaded on dropBox successfully',
        '',
        link.result.url,
        '',
        remain,
      );
<<<<<<< HEAD
      
      return response
    } catch (e) {
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
=======
    } catch (e) {
      return e;
      // const result = await HandlerError.errorHandler(e);
      // await this.handlerService.handlerException400('FA', result);
>>>>>>> ee55e186a9d713be03ef7f7079be07230b68cee9
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
<<<<<<< HEAD
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
=======

      await fs.writeFileSync(pathFile, data.result.fileBinary);
      //  await this.redisService.setKey(hadshedPath,'downloadedUrlImg', 600000);
      const response = new ResponseFileDto(
        201,
        true,
        'file downloaded successfully',
        hadshedPath,
>>>>>>> ee55e186a9d713be03ef7f7079be07230b68cee9
        '',
        '',
        null,
      );

      return response;
    } catch (e) {
<<<<<<< HEAD
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
=======
      return e;
      // const result = await HandlerError.errorHandler(e);
      // await this.handlerService.handlerException400('FA', result);
>>>>>>> ee55e186a9d713be03ef7f7079be07230b68cee9
    }
  }

  async getUrlImg(keyDto: KeyDto) {
    try {
<<<<<<< HEAD
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
=======
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
>>>>>>> ee55e186a9d713be03ef7f7079be07230b68cee9
      const result = await HandlerError.errorHandler(e);
      await this.handlerService.handlerException400('FA', result);
    }
  }
}
