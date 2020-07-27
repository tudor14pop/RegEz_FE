import {GeneralResponse} from "../GeneralResponse";

export class Company implements GeneralResponse{
    id: string;
    name: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    website: string;
    billingAttnTo: string;
    billingAddress1: string;
    billingAddress2: string;
    billingCity: string;
    billingState: string;
    billingZip: string;
    billingPhone: string;
    createdOn?: Date;
    modified?: Date;
    responseMessage: string;
    responseStatus: string;
    userInviteTokenExpirationDays: number;

    constructor(id: string, name: string, address1: string, address2: string, city: string, state: string,
                zip: string, website: string, billingAttnTo: string, billingAddress1: string, billingAddress2: string,
                billingCity: string, billingState: string, billingZip: string, billingPhone: string, userInviteTokenExpirationDays: number) {
        this.id = id;
        this.name = name;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.website = website;
        this.billingAttnTo = billingAttnTo;
        this.billingAddress1 = billingAddress1;
        this.billingAddress2 = billingAddress2;
        this.billingCity = billingCity;
        this.billingState = billingState;
        this.billingZip = billingZip;
        this.billingPhone = billingPhone;
        this.userInviteTokenExpirationDays = userInviteTokenExpirationDays;
    }
}
