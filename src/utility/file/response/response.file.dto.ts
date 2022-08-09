import { HttpStatus } from '@nestjs/common';

export class ResponseFileDto {
  constructor(statusCode, success, message, hashedUrl, link, url, remain) {
    this.statusCode = statusCode;
    this.success = success;
    this.message = message;
    this.hashedUrl = hashedUrl;
    this.link = link;
    this.remain = remain;
    this.url = url;
  }

  statusCode: HttpStatus = 201;
  success: boolean = true;
  message: string = '';
  hashedUrl: string = '';
  link: string = '';
  url: string = '';
  remain: any = null;
}
