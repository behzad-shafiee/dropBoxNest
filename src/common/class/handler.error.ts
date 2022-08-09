import { QueryFailedError } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { PublicEnum } from '../translate/enums/public.enum';
import { CountryEnum } from '../translate/enums/country.enum';
import { IpgEnum } from '../translate/enums/ipg.enum';
import { IpEnum } from '../translate/enums/ip.enum';
import { RoleEnum } from '../translate/enums/role.enum';
import { ChainEnum } from '../translate/enums/chain.enum';
import { CurrencyEnum } from '../translate/enums/currency.enum';
import { FileEnum } from '../translate/enums/file.enum';
import errors from '../translate/errors';

export class HandlerError {
  constructor() {}
  private static handlerQueryFailedError(err: QueryFailedError) {
    if (err.driverError) {
      if (err.driverError.code == '22P02' && err.driverError.file == 'uuid.c')
        return { section: 'public', value: PublicEnum.UUID_NOT_MATCH };
      if (err.driverError.code == '42703') {
        return { section: 'public', value: PublicEnum.COLUMN_NOT_EXISTS };
      }

      if (err.driverError.code == '23505') {
        if (
          err.driverError.detail.indexOf(
            '("countryCurrencyRlId", "bankMasterId")',
          ) != -1
        )
          return {
            section: 'currency',
            value: CurrencyEnum.BANK_ALREADY_EXISTS_IN_CURRENCY,
          };
        if (
          err.driverError.detail.indexOf('("countryCurrencyRlId", "ipgId")') !=
          -1
        )
          return {
            section: 'ipg',
            value: IpgEnum.IPG_ALREADY_EXISTS_IN_COUNTRY_CURRENCY,
          };
        if (
          err.driverError.detail.indexOf('("countryId", "userId", mobile)') !=
          -1
        )
          return {
            section: 'public',
            value: PublicEnum.PHONE_NUMBER_ALREADY_EXISTS,
          };
        if (err.driverError.detail.indexOf('mobile') != -1)
          return {
            section: 'public',
            value: PublicEnum.PHONE_NUMBER_ALREADY_EXISTS,
          };

        if (err.driverError.detail.indexOf('country') != -1)
          return {
            section: 'country',
            value: CountryEnum.COUNTRY_NAME_ALREADY_EXISTS,
          };
        if (err.driverError.detail.indexOf('iso2') != -1)
          return {
            section: 'country',
            value: CountryEnum.COUNTRY_ISO2_ALREADY_EXISTS,
          };
        if (err.driverError.detail.indexOf('iso3') != -1)
          return {
            section: 'country',
            value: CountryEnum.COUNTRY_ISO3_ALREADY_EXISTS,
          };
        if (err.driverError.detail.indexOf('name_ipg') != -1)
          return { section: 'ipg', value: IpgEnum.IPG_NAME_ALREADY_EXISTS };
        if (err.driverError.detail.indexOf('name_role') != -1)
          return { section: 'role', value: RoleEnum.ROLE_NAME_ALREADY_EXISTS };
      }
    }
  }
  private static handlerStringError(err: String) {
    if (
      err.indexOf(
        'Validate TransferContract error, balance is not sufficient',
      ) != -1
    )
      return { section: 'chain', value: ChainEnum.BALANCE_IS_NOT_SUFFICIENT };
  }

  private static handlerError(err: Error) {
    if (err.name == 'AddressError') {
      return { section: 'ip', value: IpEnum.IP_ADDRESS_ERROR };
    } else if (err.name == 'Error') return JSON.parse(err.message);
  }
  private static handlerBadException(err: BadRequestException) {
    console.log(err);
    console.log(err.getResponse());

    return err.getResponse();
  }
  private static handlerDropBoxErr(err: any) {
    console.log(err);

    if (err.status == 401) {
      return { section: 'file', value: FileEnum.TOKEN_OF_DROPBOX_WRONG };
    } else if (err.status == 409) {
      return { section: 'file', value: FileEnum.LINK_OF_FILE_IS_WRONG };
    } else if (err.status == 400) {
      throw new BadRequestException(err);
    }
  }
  static async errorHandler(err: any) {
    if (err.constructor.name == 'DropboxResponseError')
      return this.handlerDropBoxErr(err);
    if (err.constructor.name == 'QueryFailedError')
      return this.handlerQueryFailedError(err);
    if (err.constructor.name == 'String') return this.handlerStringError(err);
    if (err.constructor.name == 'Error') return this.handlerError(err);
    if (err.constructor.name == 'BadRequestException')
      return this.handlerBadException(err);
  }
}
