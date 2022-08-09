import { Module } from '@nestjs/common';
import { TranslateService } from './translate.service';
import  path, { join } from "path";
import { AcceptLanguageResolver, I18nModule, QueryResolver } from "nestjs-i18n";

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      formatter: (template: string, ...args: any[]) => template,
      loaderOptions: {
        path:join(__dirname, '../../../src/utility/translate/tools/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
  ],
  providers: [TranslateService] ,
  exports : [TranslateService]
})
export class TranslateModule {}
