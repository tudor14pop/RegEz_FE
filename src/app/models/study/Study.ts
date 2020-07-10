import {Cro} from "../Cro";
import {User} from "../User";
import {Site} from "../Site";
import {GeneralResponse} from "../GeneralResponse";

export interface Study extends GeneralResponse{
    id?: string
    nickname?: string
    sponsor?: string
    cro?: Cro
    protocolName?: string
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
