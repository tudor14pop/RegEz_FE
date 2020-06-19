import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {UtilService} from "../UtilService";
import {FormGroup} from "@angular/forms";
import {LoginUser} from "../../models/LoginUser";

export interface AuthenticationResponse {
    showSecurityCodeField: boolean;
    hasError: boolean
    loginUser: LoginUser
    message: ''
}

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    private loginUserSubject: BehaviorSubject<LoginUser>;
    public loginUser: Observable<LoginUser>;
    authenticationResponse: AuthenticationResponse = {
        showSecurityCodeField: false,
        hasError: false,
        loginUser: null,
        message: ''
    };

    constructor(
        private http: HttpClient,
        private router: Router,
        private utilService: UtilService
    ) {
        let subjectValue: LoginUser = JSON.parse(localStorage.getItem('loginUser'));
        this.loginUserSubject = new BehaviorSubject<LoginUser>(subjectValue);
        this.loginUser = this.loginUserSubject.asObservable();
    }

    public get loginUserValue(): LoginUser {
        return this.loginUserSubject.value;
    }

    login(loginForm: FormGroup): AuthenticationResponse {
        this.utilService.getOriginIp().subscribe(ip => {
            this.http.put<LoginUser>(environment.serverUrl + '/auth/login', {
                user: {
                    email: loginForm.value.email,
                    password: loginForm.value.password,
                },
                securityCode: loginForm.value.securityCode,
                ip: ip
            }).subscribe(
                res => {
                    if (loginForm.value.securityCode) {
                        localStorage.setItem('loginUser', JSON.stringify(res));
                        this.loginUserSubject.next(res);
                        this.router.navigate(['dashboard']);
                    } else {
                        this.authenticationResponse.showSecurityCodeField = true;
                        this.authenticationResponse.loginUser = res;
                        this.authenticationResponse.hasError = false;
                        this.authenticationResponse.message = '';
                    }
                },
                err => {
                    this.authenticationResponse.hasError = true;
                    this.authenticationResponse.message = err.error.substr(err.error.indexOf('message: ') + 9);
                }
            );
        });
        return this.authenticationResponse;
    }

    logout() {
        this.authenticationResponse.hasError = false;
        this.http.put<LoginUser>(environment.serverUrl + '/auth/logout', this.loginUserValue).subscribe(
            res => {
                localStorage.removeItem('loginUser');
                this.loginUserSubject.next(null);
                this.router.navigate(['login']);
            },
            err => {
                this.authenticationResponse.hasError = true;
                this.authenticationResponse.message = err.error.substr(err.error.indexOf('message: ') + 9);
            }
        );
        return this.authenticationResponse;
    }
}

