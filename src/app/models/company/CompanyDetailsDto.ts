import {Company} from "./Company";
import {User} from "../User";
import {BinderTemplate} from "../BinderTemplate";
import {Site} from "../Site";

export interface CompanyDetailsDto {
    company: Company
    administrators: Array<User>
    sites: Array<Site>
    sitesSize: number
    studiesSize: number
    binderTemplates: Array<BinderTemplate>
}

