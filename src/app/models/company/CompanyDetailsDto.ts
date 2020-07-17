import {Company} from "./Company";
import {User} from "../User";
import {BinderTemplate} from "../BinderTemplate";

export interface CompanyDetailsDto {
    company: Company
    administrators: Array<User>
    sitesSize: number
    studiesSize: number
    binderTemplates: Array<BinderTemplate>
}

