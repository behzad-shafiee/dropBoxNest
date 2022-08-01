import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { multerOptions } from '../../../config/multer/multerOption';
import { CreatDownlaodDto } from '../dto/creat.download.dto';
import { FileService } from '../service/file.service';
import { CreatUplaodDto } from '../dto/creat.upnload.dto';
import { Response } from 'express';

@ApiTags('imageFiles')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

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
  async uploadFile(
    @Body() creatUplaodDto: CreatUplaodDto,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    return await this.fileService.uploadFile(file, creatUplaodDto);
  }

  @Post('download')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
        },
        url: {
          type: 'string',
        },
      },
    },
  })
  async downloadFile(
    @Body() creatDownlaodDto: CreatDownlaodDto,
    @Res() res: Response,
  ) {
    return await this.fileService.downloadFile(creatDownlaodDto,res);
  }
}
