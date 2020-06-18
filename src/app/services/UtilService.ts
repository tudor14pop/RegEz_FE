import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class UtilService {
    constructor(
        private http: HttpClient
    ) {
    }

    public getOriginIp() {
        return this.http.get("http://api.ipify.org/?format=json").map((res: any) => {
            return res.ip;
        });
    }
    
}
