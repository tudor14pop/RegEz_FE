import {GeneralResponse} from "./GeneralResponse"

export interface Company extends GeneralResponse{
    id: string
    companyName: string
    address1: string
    address2: string
    city: string
    state: string
    zip: string
    website: string
    billingAttnTo: string
    billingAddress1: string
    billingAddress2: string
    billingCity: string
    billingState: string
    billingZip: string
    billingPhone: string
    createdOn: Date
}
