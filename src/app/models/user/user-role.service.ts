import {Injectable} from "@angular/core";

export enum UserRoles {
    DEFAULT = 'DEFAULT',
    MONITOR = 'MONITOR',
    AUDITOR = 'AUDITOR',
    CRC = 'CRC',
    REGULATORY = 'REGULATORY',
    INVESTIGATOR = 'INVESTIGATOR',
    RESEARCH_ASSISTANT = 'RESEARCH_ASSISTANT',
    ADMINISTRATIVE_STAFF = 'ADMINISTRATIVE_STAFF',
    QUALITY_ASSURANCE = 'QUALITY_ASSURANCE'
}

@Injectable({providedIn: 'root'})
export class UserRoleService {

    get getAccountRoles() {
        return Object.keys(UserRoles);
    }

}
