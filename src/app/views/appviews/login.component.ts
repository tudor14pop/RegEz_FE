import {Component, OnInit} from '@angular/core';
import {AuthenticationResponse, AuthenticationService} from "../../services/auth/AuthenticationService";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'login',
    template: `
        <div class="middle-box text-center loginscreen  animated fadeInDown">
            <div>
                <div>
                    <h1 class="logo-name">RegEz</h1>
                </div>
                <h3>Welcome to RegEz</h3>
                <form class="m-t" role="form" [formGroup]="loginForm" (ngSubmit)="login(loginForm)">
                    <div class="form-group">
                        <input type="email" class="form-control" placeholder="Email" required=""
                               formControlName="email">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" placeholder="Password" required=""
                               formControlName="password">
                    </div>
                    <div *ngIf="loginResponse.showSecurityCodeField" class="form-group">
                        <input type="password" class="form-control" placeholder="Security Code" required=""
                               formControlName="securityCode">
                    </div>
                    <button type="submit" class="btn btn-primary block full-width m-b">Login</button>
                    <div [ngClass]="[loginResponse.hasError ? 'd-block alert alert-danger' : 'd-none']">
                        {{loginResponse.message}}</div>

                    <a href="#"><small>Forgot password?</small></a>
                    <p class="text-muted text-center"><small>Do not have an account?</small></p>
                    <a class="btn btn-sm btn-white btn-block" href="#">Create an account</a>
                </form>
            </div>
        </div>
    `
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loginResponse: AuthenticationResponse = {
        showSecurityCodeField: false,
        hasError: false,
        loginUser: null,
        message: ''
    };

    constructor(
        private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: '',
            password: '',
            securityCode: ''
        });
    }

    login(loginForm) {
        this.loginResponse = this.authenticationService.login(loginForm);
    }

}
