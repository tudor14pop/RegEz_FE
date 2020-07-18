import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Site} from "../../models/Site";
import {Observable} from "rxjs";
import {RootHttpService} from "./root.http.service";

@Injectable({
    providedIn: 'root'
})
export class SiteService extends RootHttpService {

    getall(companyId): Observable<Array<Site>> {
        return this.http.get<Array<Site>>(environment.serverUrl + '/site/all', {params: {companyId}});
    }

    update(site: Site): Observable<Site> {
        return this.http.put<Site>(environment.serverUrl + '/site', site);
    }
}
