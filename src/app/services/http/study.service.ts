import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {RootHttpService} from "./root.http.service";
import {Study} from "../../models/Study";
import {Observable, Subscription} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StudyService extends RootHttpService {

    save(study: Study): Observable<Study> {
        return this.http.post<Study>(environment.serverUrl + '/study', study);
    }

}
