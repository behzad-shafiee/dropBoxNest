import { Module } from '@nestjs/common';
import { HandlerService } from "./handler.service";
import { TranslateModule } from "../translate/translate.module";

@Module({
  imports :[TranslateModule] ,
  providers :[HandlerService] ,
  exports :[HandlerService]
})
export class HandlerModule {}
