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
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
    @Body() creatUplaodDto: CreatUplaodDto,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    return await this.fileService.uploadFile(file, creatUplaodDto);
  }

  @Post('download')
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
  @ApiConsumes('application/json')
  async downloadFile(
    @Body() creatDownlaodDto: CreatDownlaodDto,
    @Res() res: Response,
  ) {
    return await this.fileService.downloadFile(creatDownlaodDto, res);
  }
}
