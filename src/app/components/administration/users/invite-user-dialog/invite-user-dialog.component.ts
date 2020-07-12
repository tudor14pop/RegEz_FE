import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-invite-user-dialog',
  templateUrl: './invite-user-dialog.component.html',
  styleUrls: ['./invite-user-dialog.component.scss']
})
export class InviteUserDialogComponent implements OnInit {
  inviteUserForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.inviteUserForm = new FormGroup({
      firstName: new FormControl(''),
      middleInitial: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', Validators.email),
      address1: new FormControl(''),
      address2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(''),
      phone: new FormControl('', Validators.pattern('[0-9]{10}')),
      method: new FormControl('')
    });
  }
  get inviteUserFormControls() { return this.inviteUserForm.controls; }
  invite(form) {
    console.log(form.value);
  }
}
