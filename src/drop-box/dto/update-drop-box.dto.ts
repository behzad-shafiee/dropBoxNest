import { PartialType } from '@nestjs/mapped-types';
import { CreateDropBoxDto } from './create-drop-box.dto';

export class UpdateDropBoxDto extends PartialType(CreateDropBoxDto) {}
