import { HttpStatus, Injectable, Logger, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from '../entity/file.entity';
import { Repository } from 'typeorm';
import { join } from 'path';
import { Dropbox, Error, files } from 'dropbox';
import { CreatDownlaodDto } from '../dto/creat.download.dto';
import { CreatUplaodDto } from '../dto/creat.upnload.dto';
import { Response } from '../../../common/class/response.class';
const fs = require('fs').promises;

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepo: Repository<FileEntity>,
  ) {}

  async uploadFile(file: Express.Multer.File, creatUplaodDto: CreatUplaodDto) {
    const dbx = new Dropbox({ accessToken: creatUplaodDto.access_token });
    const fileName = file.filename;
    const pathFile = join(__dirname, `../../../../upload/${fileName}`);

    try {
      const contents = await fs.readFile(pathFile);

      const res = await dbx.filesUpload({ path: `/${fileName}`, contents });

      setTimeout(() => {
        fs.unlink(pathFile);
      }, 3000);

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
      return response;
    } catch (error) {
      console.log(error);
    }
  }

async  downloadFile(creatDownlaodDto: CreatDownlaodDto, res) {



    const dbx = new Dropbox({
      accessToken: creatDownlaodDto.access_token,
    });

    dbx
      .sharingGetSharedLinkFile({
        url: creatDownlaodDto.url,
      })
      .then((data: any) => {
        const fileName = data.result.name;
        const pathFile = join(__dirname, `../../../../public/downloads/${fileName}`);
        fs.writeFile(pathFile, data.result.fileBinary, 'binary', (err) => {
          res.sendFile(pathFile);
          if (err) {
            console.log(`writeFile Err===>${err}`);
            return err;
          }
          console.log(`File: ${null} saved.`);
          return data;
        });
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
}
