import { IpgEnum } from "../enums/ipg.enum";
import { IpEnum } from "../enums/ip.enum";

export default {
  section: 'app',
  values: {
    "IPG_NOT_EXISTS": { key: 100000, value: IpgEnum.IPG_NOT_EXISTS  },
    "IPG_NAME_ALREADY_EXISTS": { key: 100001, value: IpgEnum.IPG_NAME_ALREADY_EXISTS  },
    "IPG_HAS_ERROR_GET_LINK": { key: 100002, value: IpgEnum.IPG_HAS_ERROR_GET_LINK  },
    "IPG_ORDER_NOT_EXISTS" : { key: 100003, value: IpgEnum.IPG_ORDER_NOT_EXISTS  },
    "WALLET_CURRENCY_OF_USER_NOT_MATCHED_IPG": { key: 100004, value: IpgEnum.WALLET_CURRENCY_OF_USER_NOT_MATCHED_IPG  },
    "IPG_ALREADY_EXISTS_IN_COUNTRY_CURRENCY" : { key: 100001, value: IpgEnum.IPG_ALREADY_EXISTS_IN_COUNTRY_CURRENCY  } ,
  },
};