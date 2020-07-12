export class UserModel {
    id: string;
    accountStatus: string;
    company: string;
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    email: string;
    modified: Date;
    middleInitial: string;
    city: string;
    state: string;
    zip: string;
    phone: string;

    constructor(id: string, accountStatus: string, company: string, firstName: string, lastname: string, modified: Date, city?: string,
                address1?: string, address2?: string, email?: string, zip?: string, state?: string, phone?: string) {
        this.id = id;
        this.accountStatus = accountStatus;
        this.company = company;
        this.firstName = firstName;
        this.lastName = lastname;
        this.modified = modified;
        this.city = city;
        this.zip = zip;
        this.state = state;
        this.phone = phone;
        this.address1 = address1;
        this.address2 = address2;
        this.email = email;
    }
}
