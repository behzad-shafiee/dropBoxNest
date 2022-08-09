import { IpgEnum } from "../enums/ipg.enum";
import { SmsEnum } from "../enums/sms.enum";
import { PhoneEnum } from "../enums/phone.enum";

export default {
  section: 'phone',
  values: {
    "PHONE_NUMBER_DENY_COUNTRY": { key: 100000, value: PhoneEnum.PHONE_NUMBER_DENY_COUNTRY  },
    "PHONE_NUMBER_IS_NOT_EXISTS": { key: 100001, value: PhoneEnum.PHONE_NUMBER_IS_NOT_EXISTS  } ,
    "PHONE_NUMBER_ALREADY_EXISTS": { key: 100002, value: PhoneEnum.PHONE_NUMBER_ALREADY_EXISTS  }
  },
};