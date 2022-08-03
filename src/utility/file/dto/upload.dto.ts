import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UplaodDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your access_token',
    example: '1212HHRTTH^&^*^*&^4578187',
  })
  access_token: string;

}
