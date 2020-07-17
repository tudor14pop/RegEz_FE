import {Company} from './company/Company';
import {GeneralResponse} from './GeneralResponse';
import {FilePath} from "./FilePath";

export interface BinderTemplate extends GeneralResponse {
    id: string;
    company: Company;
    name: string;
    structure: Array<FilePath>
    createdOn?: Date;
    modified?: Date;
}
