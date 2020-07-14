import {Company} from './Company';
import {GeneralResponse} from './GeneralResponse';

export interface FolderTemplate extends GeneralResponse {
    id: string;
    company: Company;
    name: string;
    createdOn?: Date;
    modified?: Date;
}
