import {GeneralResponse} from './GeneralResponse';

export interface Cro extends GeneralResponse {
    id?: string;
    name: string;
    createdOn?: Date;
    modified?: Date;
}
