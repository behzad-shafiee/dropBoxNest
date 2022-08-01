// import { EntityRepository, Not, Repository } from 'typeorm';
// import { FileEntity } from '../entities/file.entity';
// import { CreateFileDto } from '../dto/file/create.file.dto';
// import { LangService } from '../../language/lang.service';
// import { TypeUploadFileEnum } from '../enums/type.upload.file.enum';
// import { UserEntity } from '../../../modules/auth/entities/user.entity';
// import { FileDto } from '../dto/file/file.dto';
// import { BadRequestException } from '@nestjs/common';
// import { TypeStatusFileEnum } from '../enums/type.status.file.enum';
// import { NotEquals } from 'class-validator';

// @EntityRepository(FileEntity)
// export class FileRepository extends Repository<FileEntity> {
//   constructor() {
//     super();
//   }
//   async findByIdFilePrivate(
//     langService: LangService,
//     fileDto: FileDto,
//     checkRelation: boolean,
//     languageInfo: string
//   ) {
//     const queryBuilder = await this.createQueryBuilder('file');
//     if (checkRelation) {
//       queryBuilder.leftJoinAndSelect('file.user', 'user');
//     }
//     const fileEntity = await queryBuilder
//       .where({ unq_file: fileDto.id_file })
//       .getOne();

//     if (!fileEntity) {
//       const msg = await langService.translateError(
//         'file',
//         'FILE_NOT_EXISTS',
//         languageInfo,
//       );
//       throw new BadRequestException(msg);
//     }
//     try {
//       fileEntity.fillUpdate();
//       return await this.save(await this.create(fileEntity));
//     } catch (err) {}
//   }
//   async findByIdFilePublic(langService: LangService, fileDto: FileDto, languageInfo: string) {
//     const queryBuilder = await this.createQueryBuilder('file');
//     const fileEntity = await queryBuilder
//       .where({ unq_file: fileDto.id_file, type_file: TypeUploadFileEnum.COIN })
//       .getOne();
//     if (!fileEntity) {
//       const msg = await langService.translateError(
//         'file',
//         'FILE_NOT_EXISTS',
//         languageInfo,
//       );
//       throw new BadRequestException(msg);
//     }
//     try {
//       return fileEntity;
//     } catch (err) {}
//   }

//   async getFilePrivate(
//     langService: LangService,
//     userEntity: UserEntity,
//     fileDto: FileDto,
//     languageInfo: string
//   ) {
//     const result = await this.findByIdFilePrivate(langService, fileDto, true, languageInfo);
//     return result;
//   }
//   async getFilePublic(langService: LangService, fileDto: FileDto, languageInfo: string) {
//     const result = await this.findByIdFilePublic(langService, fileDto, languageInfo);
//     return result;
//   }

//   async getAllFile() {
//     return await this.createQueryBuilder('file')
//       .where({ status: TypeStatusFileEnum.TEMP })
//       .getMany();
//   }

//   async getAllFileNotMaster() {
//     return await this.createQueryBuilder('file')
//       .where({ status: Not(TypeStatusFileEnum.MASTER) })
//       .getMany();
//   }

//   async createFile(
//     langService: LangService,
//     createFileDto: CreateFileDto,
//     userEntity: UserEntity,
//   ) {
//     const fileEntity = new FileEntity();
//     fileEntity.type_file = TypeUploadFileEnum[createFileDto.type_file];
//     fileEntity.file_name = createFileDto.filename;
//     fileEntity.size = createFileDto.size;
//     fileEntity.mime_type = createFileDto.mimetype;
//     fileEntity.user = userEntity;
//     fileEntity.old_path = createFileDto.old_path;
//     fileEntity.new_path = createFileDto.new_path;
//     fileEntity.check_user = createFileDto.check_user;
//     fileEntity.ext = createFileDto.ext_file;
//     try {
//       return await this.save(await this.create(fileEntity));
//     } catch (err) {
//     }
//   }
//   async changeStatus(id_file) {
//     const fileEntity = await this.findOne(id_file);
//     fileEntity.status = TypeStatusFileEnum.MASTER;
//     return await this.save(await this.create(fileEntity));
//   }
//   async deleteFileRecord(id_file: string) {
//     return await this.createQueryBuilder()
//       .delete()
//       .from(FileEntity)
//       .where('id = :id', { id: id_file })
//       .execute();
//   }
//   async getFileLocation(langService: LangService, fileDto: FileDto, languageInfo: string) {
//     const queryBuilder = await this.createQueryBuilder('file');
//     const fileEntity = await queryBuilder
//       .where({
//         unq_file: fileDto.id_file,
//         type_file: TypeUploadFileEnum.IPLOCATION,
//       })
//       .getOne();
//     if (!fileEntity) {
//       const msg = await langService.translateError(
//         'file',
//         'FILE_NOT_EXISTS',
//         languageInfo,
//       );
//       throw new BadRequestException(msg);
//     }
//     return fileEntity;
//   }
// }
