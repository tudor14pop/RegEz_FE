import {GeneralResponse} from "./GeneralResponse";

export interface Sponsor extends GeneralResponse {
    id: string;
    name: string;
    createdOn: Date;
}
