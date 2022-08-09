import { BadRequestException, Injectable } from '@nestjs/common';

import { TranslateService } from '../translate/translate.service';

@Injectable()
export class HandlerService {
  constructor(private translateService: TranslateService) {}
  // async handlerError(lang : string ,response : ResponseSuccessDto<any, any> | ResponseCatchDto) {
  //   console.log(response.status)
  //   console.log(response.constructor.name)
  //   if (response.constructor.name=="ResponseSuccessDto") {
  //     if (response.status==StatusRepository.ERROR_ENTITY) {
  //       const errResult = await this.translateService.translateError((<ResponseSuccessDto<any, any>>response).section , response.error , lang)
  //       throw new BadRequestException(errResult)

  //     } else   if (response.status==StatusRepository.ERROR_PUBLIC) {
  //       const errResult = await this.translateService.translateError((<ResponseSuccessDto<any, any>>response).section , response.error , lang)
  //       throw new BadRequestException(errResult)

  //     }
  //   } else if (response.constructor.name=="ResponseCatchDto") {
  //     if (response.status==StatusRepository.ERROR_DB) {
  //       const errResult = await this.translateService.translateError((<ResponseSuccessDto<any, any>>response).section , response.error , lang)
  //       throw new BadRequestException(errResult)
  //     } else if (response.status==StatusRepository.ERROR_PUBLIC) {
  //       const errResult = await this.translateService.translateError((<ResponseSuccessDto<any, any>>response).section , response.error , lang)
  //       throw new BadRequestException(errResult)

  //     }
  //   }
  //   return (<ResponseSuccessDto<any, any>> response).data
  // }
  async handlerException400(lang: string, exception: Record<string, any>) {
    if (exception.key) {
      throw new BadRequestException(exception);
    } else {
      const errResult = await this.translateService.translateError(
        exception.section,
        exception.value,
        lang,
      );
      console.log(errResult);
      
      throw new BadRequestException(errResult);
    }
  }
}
