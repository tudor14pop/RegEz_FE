import {GeneralResponse} from './GeneralResponse';

export interface FilePath extends GeneralResponse {
    id: string;
    path: string;
    name: string;
    fileType: string;
    validityFrom?: Date;
    validityTo?: Date;
    description: string;
    versionable: boolean;
    sha: string;
    createdOn?: Date;
    modified?: Date;
}
