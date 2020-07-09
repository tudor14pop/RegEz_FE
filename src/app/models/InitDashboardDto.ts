import {Sponsor} from "./Sponsor";
import {User} from "./User";
import {Cro} from "./Cro";
import {Site} from "./Site";
import {GeneralResponse} from "./GeneralResponse";
import {Company} from "./Company";

export interface InitDashboardDto extends GeneralResponse{
    companies: Array<Company>
    sponsors: Array<Sponsor>
    cros: Array<Cro>
    users: Array<User>
    sites: Array<Site>
}