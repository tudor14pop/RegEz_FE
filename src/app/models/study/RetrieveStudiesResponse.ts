import {Study} from "./Study";
import {GeneralResponse} from "../GeneralResponse";

export interface RetrieveStudiesResponse extends GeneralResponse {
    studies: Array<Study>
}
