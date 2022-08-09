import { IpgEnum } from "../enums/ipg.enum";
import { IpEnum } from "../enums/ip.enum";
// import { ChainEnt } from "../../../modules/blockchain/core/entities/chain.entity";
import { ChainEnum } from "../enums/chain.enum";

export default {
  section: 'chain',
  values: {
    "CHAIN_NOT_EXISTS": { key: 100000, value: ChainEnum.CHAIN_NOT_EXISTS  } ,
    "ARCH_NOT_EXISTS": { key: 100001, value: ChainEnum.ARCH_NOT_EXISTS  } ,
    "CRYPTO_NOT_EXISTS": { key: 100002, value: ChainEnum.CRYPTO_NOT_EXISTS  } ,
    "EXCHANGE_NOT_EXISTS": { key: 100003, value: ChainEnum.EXCHANGE_NOT_EXISTS  } ,
    "EXCHANGE_VER_NOT_EXISTS": { key: 100004, value: ChainEnum.EXCHANGE_VER_NOT_EXISTS  } ,
    "TRANSACTION_FAILED": { key: 100005, value: ChainEnum.TRANSACTION_FAILED  } ,
    "BALANCE_IS_NOT_SUFFICIENT": { key: 100006, value: ChainEnum.BALANCE_IS_NOT_SUFFICIENT  }
  }
};