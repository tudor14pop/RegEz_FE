import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {User} from "../../models/User";
import {MatDialog} from "@angular/material/dialog";
import {InfoPopupComponent} from "../../components/common/info-popup.component";

export interface AuthenticationResponse {
    showSecurityCodeField: boolean;
    loginUser: User
    message: string
}

export interface LogInUserDto {
    user: User
    token: string
    ip: string
    errorMessage: string
}

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    private loginUserSubject: BehaviorSubject<User>;
    public loginUser: Observable<User>;
    authenticationResponse: AuthenticationResponse = {
        showSecurityCodeField: false,
        loginUser: null,
        message: ''
    };

    constructor(
        private http: HttpClient,
        public dialog: MatDialog,
        private router: Router
    ) {
        let subjectValue: User = JSON.parse(localStorage.getItem('regEz.loginUser'));
        this.loginUserSubject = new BehaviorSubject<User>(subjectValue);
        this.loginUser = this.loginUserSubject.asObservable();
    }

    public get loginUserValue(): User {
        return this.loginUserSubject.value;
    }

    login(loginForm: FormGroup): AuthenticationResponse {
        this.http.put<LogInUserDto>(environment.serverUrl + '/auth/login', {
            user: {
                email: loginForm.value.email,
                password: loginForm.value.password,
            },
            securityCode: loginForm.value.securityCode
        }).subscribe(
            res => {
                if (res.errorMessage) {
                    this.showError(res.errorMessage);
                } else if (loginForm.value.securityCode) {
                    localStorage.setItem('regEz.loginUser', JSON.stringify(res.user));
                    localStorage.setItem('regEz.token', res.token);
                    this.loginUserSubject.next(res.user);
                    this.router.navigate(['dashboard']);
                } else {
                    this.authenticationResponse.showSecurityCodeField = true;
                    this.authenticationResponse.loginUser = res.user;
                    this.authenticationResponse.message = '';
                }
            },
            err => {
                this.showError(err.error.substr(err.error.indexOf('message: ') + 9));
            }
        );
        return this.authenticationResponse;
    }

    logout() {
        this.http.put<LogInUserDto>(environment.serverUrl + '/auth/logout', {user: this.loginUserValue}).subscribe(
            res => {
                if (res.errorMessage) {
                    this.showError(res.errorMessage);
                } else {
                    localStorage.removeItem('regEz.loginUser');
                    localStorage.removeItem('regEz.token');
                    this.loginUserSubject.next(null);
                    this.router.navigate(['login']);
                }
            },
            err => {
                this.showError(err.error.substr(err.error.indexOf('message: ') + 9));
            }
        );

    }

    private showError(errMessage: string) {
        this.dialog.open(InfoPopupComponent, {
            data: errMessage
        });
    }
}

