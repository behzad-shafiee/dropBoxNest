import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class KeyDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'enter your redisKey',
    example: '1212HHRTTH^&^*^*&^4578187',
  })
  redisKey: string;

}
