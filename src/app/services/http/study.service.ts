import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {RootHttpService} from "./root.http.service";
import {Study} from "../../models/Study";
import {Observable, Subscription} from "rxjs";
import { HttpParams } from '@angular/common/http';
import { InitDashboardDto } from 'src/app/models/InitDashboardDto';

@Injectable({
    providedIn: 'root'
})
export class StudyService extends RootHttpService {

    create(study: Study): Observable<Study> {
        return this.http.post<Study>(environment.serverUrl + '/study', study);
    }

  getStudies(): Observable<InitDashboardDto> {
    const params = new HttpParams().set('investigatorId', '')
    .set('siteId', '')
    .set('companyId', '')
    .set('keywords', '');
    return this.http.get<InitDashboardDto>(environment.serverUrl + '/dashboard/init', {params});

  }

}
