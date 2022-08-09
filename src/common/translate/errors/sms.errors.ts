import { IpgEnum } from "../enums/ipg.enum";
import { SmsEnum } from "../enums/sms.enum";

export default {
  section: 'sms',
  values: {
    "SMS_PROVIDER_HAS_ERROR": { key: 100000, value: SmsEnum.SMS_PROVIDER_HAS_ERROR  },
    "SMS_PROVIDER_CAN_NOT_RUN": { key: 100001, value: SmsEnum.SMS_PROVIDER_CAN_NOT_RUN  },
    "SMS_CODE_NOT_AVAILABLE": { key: 100002, value: SmsEnum.SMS_CODE_NOT_AVAILABLE  },
  },
};