import {Company} from './Company';
import {GeneralResponse} from './GeneralResponse';

export interface BinderTemplate extends GeneralResponse {
    id: string;
    company: Company;
    name: string;
    createdOn?: Date;
    modified?: Date;
}
