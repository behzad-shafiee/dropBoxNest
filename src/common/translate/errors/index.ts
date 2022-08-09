import IpgErrors from "./ipg.errors"
import PublicErrors from "./public.errors"
import CountryErrors from "./country.errors"
import CurrencyErrors from "./currency.errors"
import IpErrors from "./ip.errors"
import SmsErrors from "./sms.errors"
import RoleErrors from "./role.errors"
import PhoneErrors from "./phone.errors"
import ChainErrors from "./chain.errors"
import fileErrors from "./file.errors"
export default {
  file:fileErrors,
  ipg: IpgErrors ,
  public : PublicErrors ,
  country : CountryErrors ,
  currency : CurrencyErrors ,
  ip : IpErrors ,
  sms : SmsErrors ,
  role : RoleErrors ,
  phone : PhoneErrors ,
  chain : ChainErrors
}