import { IpgEnum } from '../enums/ipg.enum';
import { PublicEnum } from '../enums/public.enum';
import { CountryEnum } from '../enums/country.enum';
import { FileEnum } from '../enums/file.enum';

export default {
  section: 'file',
  values: {
    TOKEN_OF_DROPBOX_WRONG: {
      key: 100000,
      value: FileEnum.TOKEN_OF_DROPBOX_WRONG,
    },
    LINK_OF_FILE_IS_WRONG: {
      key: 100001,
      value: FileEnum.LINK_OF_FILE_IS_WRONG,
    },
  },
};
