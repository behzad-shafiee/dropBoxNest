import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { HttpException, HttpStatus } from '@nestjs/common';
import { TypeFileEnum } from '../../utility/file/enum/type.file.enum';

// Multer configuration
export const multerConfig = {
  dest: './temp',
};

// Multer upload options
export const multerOptions = {
  // Enable file size limits
  limits: {
    fileSize: 100000000000,
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    const imgTypes=Object.values(TypeFileEnum);
console.log(imgTypes);
    const mimetype=file.mimetype.split('/')[1]
    console.log(mimetype);
    
    if (imgTypes.indexOf(mimetype)!==-1) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  // Storage properties
  storage: diskStorage({
    // Destination storage path details
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = `${multerConfig.dest}`;
      // Create folder if doesn't exist
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    // File modification details
    filename: (req: any, file: any, cb: any) => {
        const uniqStr=Date.now();
      // Calling the callback passing the random name generated with the original extension name
      cb(null, `${uniqStr}${file.originalname}`);
    },
  }),
};
