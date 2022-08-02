import { ResponseHeader } from './response-header.class';

export class Response {
  constructor(body: any, header: ResponseHeader, remain:any) {
    this.body = body;
    this.header = header;
    this.remain = remain;
  }
  header: ResponseHeader = null;
  body: any = null;
  remain: any = null;
}
