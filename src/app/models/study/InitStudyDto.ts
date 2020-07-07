import {Sponsor} from "../Sponsor";
import {User} from "../User";
import {Cro} from "../Cro";
import {Site} from "../Site";
import {GeneralResponse} from "../GeneralResponse";

export interface InitStudyDto extends GeneralResponse{
    sponsors: Array<Sponsor>
    cros: Array<Cro>
    users: Array<User>
    sites: Array<Site>
}
