import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/auth/AuthenticationService';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/http/user.service";
import {UserInviteToken} from "../models/user/UserInviteToken";

@Component({
    selector: 'app-user-invite',
    template: `
        <div class="gray-bg fh-150 w-100">
            <div class="middle-box text-center loginscreen animated fadeInDown">
                <div>
                    <div>
                        <h1 class="logo-name ">RegEz</h1>
                    </div>
                    <h4>Hello {{userInviteToken?.user.firstName}},</h4>
                    <p>Welcome to eRegulatory System, please register by confirming your sms security code and set your
                        account password</p>
                    <form class="m-t" role="form" [formGroup]="form" (ngSubmit)="submit()">
                        <mat-form-field>
                            <input type="text" placeholder="Security code" matInput formControlName="securityCode">
                            <mat-error
                                    *ngIf="form.get('securityCode').touched && form.get('securityCode').hasError('required')">
                                Required
                            </mat-error>
                        </mat-form-field>
                        <mat-form-field>
                            <input matInput placeholder="Password" formControlName="password"
                                   [type]="hide ? 'password' : 'text'">
                            <mat-icon matSuffix
                                      (click)="hide = !hide">{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
                            <mat-error
                                    *ngIf="form.get('password').touched && form.get('password').hasError('required')">
                                Required
                            </mat-error>
                            <mat-error
                                    *ngIf="form.get('password').touched && form.get('password').hasError('pattern')">
                                Should have at least 8 characters, one lowercase, one uppercase and a number
                            </mat-error>
                        </mat-form-field>

                        <button type="submit" class="btn btn-w-m btn-info block full-width mt-3">Register</button>
                    </form>

                    <p class="m-t"><small>eRegulatory System Copyright &copy; 2020</small></p>
                </div>
            </div>
        </div>

    `
})
export class UserInviteComponent implements OnInit {

    form: FormGroup;
    userInviteToken: UserInviteToken;
    hide = true;

    constructor(
        private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        localStorage.removeItem('regEz.token');
        this.route.params.subscribe(params => {
            this.userService.confirmUserInviteToken(params.userInviteToken).subscribe(res => {
                    if (res.responseStatus != "SUCCESS") {
                        this.userService.showError(res.responseStatus + ' ' + res.responseMessage);
                    } else {
                        console.log(res);
                        this.userInviteToken = res;
                        this.form.controls.userId.setValue(res.user.id);
                    }
                },
                err => {
                    this.userService.showError(err.error.substr(err.error.indexOf('message: ') + 9));
                }
            );
        });
        this.form = this.formBuilder.group({
            userId: '',
            securityCode: ['', Validators.required],
            password: ['', [
                Validators.required,
                Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{8,}')
            ]]
        });
    }

    submit() {
        if (this.form.valid) {
            this.userService.registerUser(this.form.value).subscribe(res => {
                    if (res.responseStatus != "SUCCESS") {
                        this.userService.showError(res.responseStatus + ' ' + res.responseMessage);
                    } else {
                        console.log(res);
                        this.userService.showSuccess();
                        this.router.navigate(['login']);
                    }
                },
                err => {
                    this.userService.showError(err.error.substr(err.error.indexOf('message: ') + 9));
                }
            );
        } else {
            this.form.markAllAsTouched();
        }
    }

}
