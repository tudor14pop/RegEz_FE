import {GeneralResponse} from '../GeneralResponse';
import {Company} from "../company/Company";

export interface User extends GeneralResponse {
    id?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password?: string;
    middleInitial?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    phone?: string;
    validationMethod?: string;
    company: Company;
    accountType?: string;
    accountStatus: string;
    role?: string;
    createdOn?: Date;
    modified?: Date;
}
