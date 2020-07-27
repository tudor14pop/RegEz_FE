import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {User} from "../../models/user/User";
import {MatDialog} from "@angular/material/dialog";
import {InfoPopupComponent} from "../../components/common/info-popup.component";
import {GeneralResponse} from "../../models/GeneralResponse";
import { LabelService } from '../label.service';

export interface AuthenticationResponse {
    showSecurityCodeField: boolean;
    loginUser: User
    message: string
}

export interface LogInUserDto extends GeneralResponse{
    user: User
    token: string
    ip: string
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
        private labelService: LabelService,
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
        localStorage.removeItem('regEz.token');
        this.http.put<LogInUserDto>(environment.serverUrl + '/auth/login', {
            user: {
                email: loginForm.value.email,
                password: loginForm.value.password,
            },
            securityCode: loginForm.value.securityCode
        }).subscribe(
            res => {
                if (res.responseStatus != "SUCCESS") {
                    this.showError(res.responseMessage);
                } else if (loginForm.value.securityCode) {
                    localStorage.setItem('regEz.loginUser', JSON.stringify(res.user));
                    localStorage.setItem('regEz.token', res.token);
                    this.loginUserSubject.next(res.user);
                    this.labelService.load();
                    this.router.navigate(['dashboard']);
                } else {
                    this.authenticationResponse.showSecurityCodeField = true;
                    this.authenticationResponse.loginUser = res.user;
                    this.authenticationResponse.message = '';
                }
            },
            err => {
                this.showError(err.error.message);
            }
        );
        return this.authenticationResponse;
    }

    logout() {
        if (this.loginUserValue) {
            this.http.put<LogInUserDto>(environment.serverUrl + '/auth/logout', {user: this.loginUserValue}).subscribe(
                res => {
                    if (res.responseStatus != "SUCCESS") {
                        this.showError(res.responseMessage);
                    }
                },
                err => {
                    this.showError(err.error.message);
                }
            );
            localStorage.removeItem('regEz.loginUser');
            localStorage.removeItem('regEz.token');
            this.loginUserSubject.next(null);
            this.router.navigate(['login']);
        }
    }

    private showError(errMessage: string) {
        this.dialog.open(InfoPopupComponent, {
            data: errMessage
        });
    }
}

