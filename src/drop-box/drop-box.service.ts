import { Injectable } from '@nestjs/common';
import { CreateDropBoxDto } from './dto/create-drop-box.dto';
import { UpdateDropBoxDto } from './dto/update-drop-box.dto';
import { Dropbox, Error, files } from 'dropbox'; // eslint-disable-line no-unused-vars
import fs = require('fs');
import path = require('path');

@Injectable()
export class DropBoxService {
  create(createDropBoxDto: CreateDropBoxDto) {
    
    const dbx = new Dropbox({ accessToken: createDropBoxDto.access_token });

    fs.readFile(path.join(__dirname, `../upload/uploadImg.png`), 'utf8', (err, contents) => {
      if (err) {
        console.log('Error: ', err);
      }

      // This uploads basic.js to the root of your dropbox
      dbx
        .filesUpload({ path: '/basic.js', contents })
        .then((response: any) => {
          console.log(response);
        })
        .catch((uploadErr: Error<files.UploadError>) => {
          console.log(uploadErr);
        });
    });

    return;
  }

  findAll() {
    return `This action returns all dropBox`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dropBox`;
  }

  update(id: number, updateDropBoxDto: UpdateDropBoxDto) {
    return `This action updates a #${id} dropBox`;
  }

  remove(id: number) {
    return `This action removes a #${id} dropBox`;
  }
}
