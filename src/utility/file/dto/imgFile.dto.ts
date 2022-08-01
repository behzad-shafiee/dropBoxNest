import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class FileUploadDto {
  @IsNotEmpty()
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
