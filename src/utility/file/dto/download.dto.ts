import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DownlaodDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your access_token',
    example: '1212HHRTTH^&^*^*&^4578187',
    type:'string'
  })
  access_token: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your url',
    example:
      'https://www.dropbox.com/home/%D8%A8%D9%87%D8%B2%D8%A7%D8%AF%20%D8%B4%D9%81%DB%8C%D8%B9%DB%8C/Apps/fileUploaderNest?preview=1659350490021p1.png',
      type:'string'
    })
  url: string;
}
