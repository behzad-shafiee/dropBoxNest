import { Injectable, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from '../entity/file.entity';
import { Repository } from 'typeorm';
import { join } from 'path';
import { Dropbox, Error, files } from 'dropbox';
import { CreatDownlaodDto } from '../dto/creat.download.dto';
import { CreatUplaodDto } from '../dto/creat.upnload.dto';
import { buffer } from 'stream/consumers';
import { binary } from 'joi';
const fs = require('fs');

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepo: Repository<FileEntity>,
  ) {}

  uploadFile(file: Express.Multer.File, creatUplaodDto: CreatUplaodDto) {
    const dbx = new Dropbox({ accessToken: creatUplaodDto.access_token });
    const fileName = file.filename;
    const mimeType = file.mimetype.split('/')[1];
    const pathFile = join(__dirname, `../../../../upload/${fileName}`);
    fs.readFile(pathFile, (err, contents) => {
      if (err) {
        return err;
      }

      dbx
        .filesUpload({
          path: `/${fileName}`,
          contents,
        })
        .then((response: any) => {
          console.log(`response===>${JSON.stringify(response)}`);
          return response;
        })

        .catch((err) => {
          console.log(`uploadErr ====>${err}`);
          return err;
        });
      return file;
    });
  }

  downloadFile(creatDownlaodDto: CreatDownlaodDto, res) {
    const dbx = new Dropbox({
      accessToken: creatDownlaodDto.access_token,
    });

    dbx
      .sharingGetSharedLinkFile({
        url: 'https://www.dropbox.com/s/8tkiehfo027et42/1659356948351cryptodogs_logo.png?dl=0',
      })
      .then((data: any) => {
        const buff: any = Buffer.from(data.toString());
        const primaryData: any = JSON.stringify(buff.toString());
        // const x = JSON.parse(primaryData.toString());
        console.log(buff.toString());
        console.log(primaryData);

        // console.log(data.result.fileBinary);
        const fileName = (data.result.name);
        const pathFile = join(__dirname, `../../../../downloads/${fileName}`);
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
