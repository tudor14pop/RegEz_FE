import {Company} from "./Company";
import {GeneralResponse} from "./GeneralResponse";

export interface Site extends GeneralResponse {
    id: string
    company: Company
    name: string
    address1: string
    address2: string
    city: string
    state: string
    zip: string
    createdOn: Date;
}
