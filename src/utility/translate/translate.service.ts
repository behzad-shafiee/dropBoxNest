import { BadRequestException, Injectable } from "@nestjs/common";
import errors from '../../common/translate/errors/index'
import { Translate } from "../../common/translate/translate.class";
import { MapperLanguageEnum } from "../../common/enums/mapper.language.enum";
import { I18nService } from "nestjs-i18n";



@Injectable()
export class TranslateService {
constructor(private readonly i18nService: I18nService) {
}
  getErrors(section: string, value: string): Record<string, any> | boolean {

    if (errors[section] == undefined) return false;
    if (errors[section].values[value] == undefined) return false;
    return errors[section].values[value];
  }

  async translateError( section: string, property: any, lang: string, args: any = null,
  ): Promise<Object> {
    
    const errors = this.getErrors(section, property);
    console.log(errors);
    
    const translate = new Translate();
    translate.code = errors['value'];
    const i18n = `i18n.${section}.${errors['value']}`;
    translate.message = await this.i18nService.translate(i18n, {
      lang: MapperLanguageEnum[lang],
      args,
    });
    return { section, key: errors['key'], message: translate.message };
  }


  async throwError(section : string , lang :string , error_code : string) : Promise<boolean> {
    const  result =await  this.translateError(section , error_code , lang)
    throw new BadRequestException(result)

  }
}
