import {Company} from './company/Company';
import {GeneralResponse} from './GeneralResponse';

export interface Site extends GeneralResponse {
    id: string;
    company: Company;
    name: string;
    active: boolean;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    createdOn?: Date;
    modified?: Date;
}
