import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationResponse, AuthenticationService} from '../services/auth/AuthenticationService';

@Component({
    selector: 'app-login',
    template: `
        <div class="gray-bg fh-150 w-100">
            <div class="middle-box text-center loginscreen animated fadeInDown">
                <div>
                    <div>
                        <h1 class="logo-name ">RegEz</h1>
                    </div>
                    <h4>Welcome to eRegulatory System</h4>
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
                        <button type="submit" class="btn btn-w-m btn-info block full-width">Login</button>

                        <a><small>Forgot password?</small></a>
                    </form>
                    <p class="m-t"><small>eRegulatory System Copyright &copy; 2020</small></p>
                </div>
            </div>
        </div>

    `
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginResponse: AuthenticationResponse = {
    showSecurityCodeField: false,
    loginUser: null,
    message: ''
  };

  constructor(
      private authenticationService: AuthenticationService,
      private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.authenticationService.logout();
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
