import { TypeFileEnum } from '../enum/type.file.enum';

export class CreatFileDto {
  id: string;

  file_name: string;

  uniq_file_name: string;

  mime_type: {
    type: 'enum';
    enum: TypeFileEnum;
    default: 'png';
  };

  size: number;
}
