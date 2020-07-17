import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    getUsers(): Observable<UserModel[]> {
        return this.http.get<UserModel[]>(environment.serverUrl + '/user/all');
    }

    getUserByID(id): Observable<UserModel> {
        return this.http.get<UserModel>(environment.serverUrl + '/user', {params: {id}});
    }
}
