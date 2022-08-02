import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  renderHtmlPage(@Res() res: Response) {
    const path = join(__dirname, '../view/index.html');
    console.log(path);

    return res.sendFile(path);
  }
}
