import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as uuid from 'uuid';
import { LabelService } from './label.service';

declare let ga: any;

@Injectable({providedIn: 'root'})
export class AppLoadService {
    constructor(
        private http: HttpClient
    
    ) {
    }

    async initializeApp() {
        let ipAddress = (await this.http.get("https://api.ipify.org/?format=json").toPromise() as any).ip;
        localStorage.setItem('regEz.ip', ipAddress);
    }
}
