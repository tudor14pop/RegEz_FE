import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
declare var $: any;
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  id: string;
  user: UserModel = new UserModel(null, null, null, null, null, null, null, null, null, null);
  editUserForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    $('.footable').footable();
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.editUserForm = new FormGroup({
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
    setTimeout(() => {
    this.userService.getUserByID(this.id).subscribe(res => {
     this.user = new UserModel(res.id, res.accountStatus, res.company, res.firstName, res.lastName, res.modified, res.city, res.address1,
       res.address2, res.email, res.zip, res.state, res.phone);
     this.setForm(this.user);

    }, err => {
      console.log(err);
    });
   }, 500);
  }

  setForm(user) {
    this.editUserForm.controls.lastName.setValue(user.lastName);
    this.editUserForm.controls.firstName.setValue(user.firstName);
    this.editUserForm.controls.middleInitial.setValue(user.middleInitial);
    this.editUserForm.controls.address1.setValue(user.address1);
    this.editUserForm.controls.address2.setValue(user.address2);
    this.editUserForm.controls.city.setValue(user.city);
    this.editUserForm.controls.zip.setValue(user.zip);
    this.editUserForm.controls.state.setValue(user.state);
    this.editUserForm.controls.email.setValue(user.email);
    this.editUserForm.controls.phone.setValue(user.phone);
  }

  edit(form) {
    console.log(form.value);
  }
}
