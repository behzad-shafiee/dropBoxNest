import { IpgEnum } from "../enums/ipg.enum";
import { PublicEnum } from "../enums/public.enum";
import { CountryEnum } from "../enums/country.enum";
import { CurrencyEnum } from "../enums/currency.enum";

export default {
  section: 'currency',
  values: {
    "CURRENCY_NOT_EXISTS": { key: 100000, value: CurrencyEnum.CURRENCY_NOT_EXISTS },
    "CURRENCY_NAME_ALREADY_EXISTS": { key: 100001, value: CurrencyEnum.CURRENCY_NAME_ALREADY_EXISTS },
    "CURRENCY_CODE_ALREADY_EXISTS": { key: 100002, value: CurrencyEnum.CURRENCY_NAME_ALREADY_EXISTS },
    "BANK_NOT_EXISTS": { key: 100003, value: CurrencyEnum.BANK_NOT_EXISTS },
    "BANK_ALREADY_EXISTS": { key: 100004, value: CurrencyEnum.BANK_ALREADY_EXISTS },
    "BANK_ALREADY_EXISTS_IN_CURRENCY": { key: 100005, value: CurrencyEnum.BANK_ALREADY_EXISTS_IN_CURRENCY },


  },
};