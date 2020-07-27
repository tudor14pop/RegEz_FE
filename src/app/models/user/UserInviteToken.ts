import {GeneralResponse} from "../GeneralResponse";
import {User} from "./User";

export interface UserInviteToken extends GeneralResponse {

    id: string
    user: User
    token: string
    expireDate: Date
    createdOn: Date

}
