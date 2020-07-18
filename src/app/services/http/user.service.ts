import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {UserModel} from '../../models/user.model';
import {RootHttpService} from "./root.http.service";

@Injectable({
    providedIn: 'root'
})
export class UserService extends RootHttpService {

    getUsers(): Observable<UserModel[]> {
        return this.http.get<UserModel[]>(environment.serverUrl + '/user/all');
    }

    getUserByID(id): Observable<UserModel> {
        return this.http.get<UserModel>(environment.serverUrl + '/user', {params: {id}});
    }
}
