import { HttpStatus } from '@nestjs/common';

export class ResponseHeader {
  constructor(statusCode, succeed, message) {
    (this.statusCode = statusCode),
      (this.succeed = succeed),
      (this.message = message);
  }
  statusCode: HttpStatus;
  succeed: boolean;
  message: string;
}
