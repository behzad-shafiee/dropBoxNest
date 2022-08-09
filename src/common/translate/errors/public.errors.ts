import { IpgEnum } from "../enums/ipg.enum";
import { PublicEnum } from "../enums/public.enum";

export default {
  section: 'public',
  values: {
    "UUID_NOT_MATCH": { key: 100000, value: PublicEnum.UUID_NOT_MATCH  },
    "PHONE_NUMBER_IS_NOt_VALID" : { key: 100001, value: PublicEnum.PHONE_NUMBER_IS_NOT_VALID} ,
    "PHONE_NUMBER_ALREADY_EXISTS" : { key: 100002, value: PublicEnum.PHONE_NUMBER_ALREADY_EXISTS } ,
    "ACCESS_IS_DENIDE" : { key: 100003, value: PublicEnum.ACCESS_IS_DENIDE } ,
    "COLUMN_NOT_EXISTS" : { key: 100004, value: PublicEnum.COLUMN_NOT_EXISTS }

  },
};