import {Injectable} from "@angular/core";

export enum Roles {
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
export class RoleService {

    get getAccountRoles() {
        return Object.keys(Roles);
    }

}
