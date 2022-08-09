import { IpgEnum } from "../enums/ipg.enum";
import { PublicEnum } from "../enums/public.enum";
import { CountryEnum } from "../enums/country.enum";

export default {
  section: 'country',
  values: {
    "COUNTRY_NOT_EXISTS": { key: 100000, value: CountryEnum.COUNTRY_NOT_EXISTS },
    "COUNTRY_NAME_ALREADY_EXISTS": { key: 100000, value: CountryEnum.COUNTRY_NAME_ALREADY_EXISTS },
    "COUNTRY_ISO2_ALREADY_EXISTS": { key: 100000, value: CountryEnum.COUNTRY_ISO2_ALREADY_EXISTS },
    "COUNTRY_ISO3_ALREADY_EXISTS": { key: 100000, value: CountryEnum.COUNTRY_ISO3_ALREADY_EXISTS }

  },
};