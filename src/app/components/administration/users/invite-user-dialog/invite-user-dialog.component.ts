import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-invite-user-dialog',
    templateUrl: './invite-user-dialog.component.html',
    styleUrls: ['./invite-user-dialog.component.scss']
})
export class InviteUserDialogComponent implements OnInit {
    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder
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
            validationMethod: ['', Validators.required],
            accountType: ['', Validators.required],
        });
    }

    get inviteUserFormControls() {
        return this.form.controls;
    }

    invite(form) {
        if (this.form.valid) {
            console.log(form.value);
        } else {
            this.form.markAllAsTouched();
        }
    }
}
