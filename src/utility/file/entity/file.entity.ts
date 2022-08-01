import { TypeFileEnum } from '../enum/type.file.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  file_name: string;

  @Column()
  uniqe_file_name: string;

  @Column()
  mime_type: TypeFileEnum;
  default: TypeFileEnum.jpg;
  
  @Column()
  size: number;
}
