export class User {
    id: string;
    accountStatus: string;
    company: string;
    firstName: string;
    lastName: string;
    modified: Date;

    constructor(id: string, accountStatus: string, company: string, firstName: string, lastname: string, modified: Date) {
        this.id = id;
        this.accountStatus = accountStatus;
        this.company = company;
        this.firstName = firstName;
        this.lastName = lastname;
        this.modified = modified;
    }
}
