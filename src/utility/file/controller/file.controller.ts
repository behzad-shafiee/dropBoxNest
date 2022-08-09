import {
  Body,
  CacheInterceptor,
  ClassSerializerInterceptor,
  Controller,
<<<<<<< HEAD
  Get,
=======
  ParseFilePipe,
>>>>>>> ee55e186a9d713be03ef7f7079be07230b68cee9
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Cron } from '@nestjs/schedule';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { join } from 'path';
import { multerOptions } from '../../../config/multer/multerOption';
import { DownlaodDto } from '../dto/download.dto';
import { KeyDto } from '../dto/key.dto';
import { UplaodDto } from '../dto/upload.dto';
import { FileService } from '../service/file.service';
import { Response } from 'express';

@ApiTags('Files')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
<<<<<<< HEAD

  @Get('/page')
  renderHtmlPage(@Res() res: Response) {
    try {

      const path = join(__dirname, '../view/index.html');
      console.log(path);
      return res.sendFile(path);
    } catch (error) {
      console.log(error);
    }
  }


=======

  @Cron('10 * * * * *', { name: 'deleteImg' })
>>>>>>> ee55e186a9d713be03ef7f7079be07230b68cee9
  @Post('upload')
  @UseInterceptors(
    ClassSerializerInterceptor,
    FileInterceptor('file', multerOptions),
  )
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Request recieved and Response is Ok',
  })
  @ApiResponse({ status: 201, description: 'image uploaded' })
  @ApiResponse({
    status: 400,
    description:
      "Bad Request : type of fileds are't suitable or field are empty",
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized : your token is wrong or expired',
  })
  @ApiResponse({
    status: 404,
    description:
      'Not found : your fields are empty or your infoes are incorrect',
  })
  @ApiResponse({ status: 201, description: 'image uploaded' })
  async uploadFile(
    @Body() uplaodDto: UplaodDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
<<<<<<< HEAD
    
=======
>>>>>>> ee55e186a9d713be03ef7f7079be07230b68cee9
    return await this.fileService.uploadFile(uplaodDto, file);
  }

  @Post('download')
  @ApiResponse({ status: 201, description: 'image uploaded' })
  @ApiResponse({
    status: 400,
    description:
      "Bad Request : type of fileds are't suitable or field are empty or  your fields are empty or your infoes are incorrect",
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized : your token is wrong or expired',
  })
  @ApiResponse({ status: 201, description: 'image download' })
  @ApiBody({ type: DownlaodDto })
  async downloadFile(@Body() creatDownlaodDto: DownlaodDto) {
    return await this.fileService.downloadFile(creatDownlaodDto);
  }

  @Post('getUrlImg')
  @ApiResponse({ status: 200, description: 'ok' })
  @ApiResponse({
    status: 400,
    description:
      "Bad Request : type of fileds are't suitable or field are empty or  your fields are empty or your infoes are incorrect",
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized : your token is wrong or expired',
  })
  @ApiBody({ type: KeyDto })
  async getUrlImg(@Body() keyDto: KeyDto) {
    return await this.fileService.getUrlImg(keyDto);
  }
}
