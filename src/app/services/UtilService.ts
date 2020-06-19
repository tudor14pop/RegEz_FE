import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class UtilService {
    constructor(
        private http: HttpClient
    ) {
    }

    public getOriginIp() {
        return this.http.get("http://api.ipify.org/?format=json").pipe(map((res: any) => {
            return res.ip;
        }));
    }

}
