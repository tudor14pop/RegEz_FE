import {Sponsor} from "./Sponsor";
import {User} from "./user/User";
import {Cro} from "./Cro";
import {Site} from "./Site";
import {GeneralResponse} from "./GeneralResponse";
import {Company} from "./company/Company";
import {Study} from "./Study";
import {BinderTemplate} from "./BinderTemplate";

export interface InitDashboardDto extends GeneralResponse{
    companies: Array<Company>
    sponsors: Array<Sponsor>
    cros: Array<Cro>
    users: Array<User>
    sites: Array<Site>
    studies: Array<Study>
    binderTemplates: Array<BinderTemplate>
}
