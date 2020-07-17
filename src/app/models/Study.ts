import {Cro} from "./Cro";
import {User} from "./User";
import {Site} from "./Site";
import {GeneralResponse} from "./GeneralResponse";
import {Sponsor} from "./Sponsor";

export interface Study extends GeneralResponse{
    id?: string
    nickname?: string
    sponsor?: Sponsor
    cro?: Cro
    protocol?: number
    principalInvestigator?: User
    subInvestigator?: User
    site?: Site
    siteNumber?: number
    indNumber?: number
    leadCrc?: User
    backupCrc?: User
    createdOn?: Date
    modified?: Date
}