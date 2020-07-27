import {Injectable} from "@angular/core";

export enum AccountType {
    EXTERNAL = 'EXTERNAL',
    REGULAR_USER = 'REGULAR_USER',
    REGULATORY_USER = 'REGULATORY_USER',
    COMPANY_ADMINISTRATOR = 'COMPANY_ADMINISTRATOR',
    SYSTEM_ADMINISTRATOR = 'SYSTEM_ADMINISTRATOR',
    SUPER_USER = 'SUPER_USER'
}

@Injectable({providedIn: 'root'})
export class AccountTypeService {

    get getAccountTypes() {
        return Object.keys(AccountType);
    }
    
}
