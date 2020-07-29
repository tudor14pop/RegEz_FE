import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {UserModel} from '../../models/user.model';
import {RootHttpService} from "./root.http.service";
import {User} from "../../models/user/User";
import {UserInviteToken} from "../../models/user/UserInviteToken";

@Injectable({
    providedIn: 'root'
})
export class UserService extends RootHttpService {

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(environment.serverUrl + '/user/all');
    }

    getUserByID(id): Observable<User> {
        return this.http.get<User>(environment.serverUrl + '/user', {params: {id}});
    }

    create(user: User): Observable<User> {
        return this.http.post<User>(environment.serverUrl + '/user', user);
    }

    confirmUserInviteToken(userInviteToken: string): Observable<UserInviteToken> {
        return this.http.get<UserInviteToken>(environment.serverUrl + '/user/confirmUserInviteToken', {params: {userInviteToken}});
    }

    registerUser(userRegister: any): Observable<User> {
        return this.http.post<User>(environment.serverUrl + '/user/register',  userRegister);
    }
}
