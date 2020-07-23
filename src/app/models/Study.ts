import {Cro} from "./Cro";
import {User} from "./user/User";
import {Site} from "./Site";
import {GeneralResponse} from "./GeneralResponse";
import {Sponsor} from "./Sponsor";

export interface Study extends GeneralResponse{
    id?: string
    nickname?: string
    sponsor?: Sponsor
    cro?: Cro
    protocol?: string
    principalInvestigator?: User
    subInvestigator?: User
    site?: Site
    siteNumber?: string
    indNumber?: string
    leadCrc?: User
    backupCrc?: User
    createdOn?: Date
    modified?: Date
}
