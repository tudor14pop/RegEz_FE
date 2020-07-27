import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountTypeService} from "../../../../models/user/AccountTypeService";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {CompanyDetailsDto} from "../../../../models/company/CompanyDetailsDto";
import {UserService} from "../../../../services/http/user.service";

@Component({
    selector: 'app-invite-user-dialog',
    templateUrl: './invite-user-dialog.component.html',
    styleUrls: ['./invite-user-dialog.component.scss']
})
export class InviteUserDialogComponent implements OnInit {
    form: FormGroup;
    @Output() onUserAdded = new EventEmitter();

    constructor(
        @Inject(MAT_DIALOG_DATA) public companyDetailsDtos: Array<CompanyDetailsDto>,
        private formBuilder: FormBuilder,
        private userService: UserService,
        public dialog: MatDialog,
        public accountTypeService: AccountTypeService
    ) {
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            middleInitial: '',
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
            phone: ['', [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$')]],
            company: ['', Validators.required],
            validationMethod: ['', Validators.required],
            accountType: ['', Validators.required],
        });
    }

    get inviteUserFormControls() {
        return this.form.controls;
    }

    submit() {
        if (this.form.valid) {
            console.log(this.form.value);
            this.userService.create(this.form.value).subscribe(
                res => {
                    if (res.responseStatus != "SUCCESS") {
                        this.userService.showError(res.responseMessage);
                    } else {
                        console.log(res);
                        this.onUserAdded.emit();
                        this.dialog.closeAll();
                        this.userService.showSuccess()
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
