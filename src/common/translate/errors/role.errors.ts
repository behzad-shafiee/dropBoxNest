import { IpgEnum } from "../enums/ipg.enum";
import { IpEnum } from "../enums/ip.enum";
import { RoleEnum } from "../enums/role.enum";

export default {
  section: 'role',
  values: {
    "ROLE_NAME_ALREADY_EXISTS": { key: 100000, value: RoleEnum.ROLE_NAME_ALREADY_EXISTS  } ,
    "ROLE_HAS_DEFAULT_ACTION": { key: 100001, value: RoleEnum.ROLE_HAS_DEFAULT_ACTION  } ,
    "ROLE_NOT_EXISTS": { key: 100002, value: RoleEnum.ROLE_NOT_EXISTS  }

  },
};