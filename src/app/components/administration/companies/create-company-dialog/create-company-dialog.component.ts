import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-company-dialog',
  templateUrl: './create-company-dialog.component.html',
  styleUrls: ['./create-company-dialog.component.scss']
})
export class CreateCompanyDialogComponent implements OnInit {

  createCompanyForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.createCompanyForm = new FormGroup({
      companyName: new FormControl(''),
      address1: new FormControl(''),
      address2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(''),
      person: new FormControl(''),
      phone: new FormControl(''),
      website: new FormControl(''),
      billingAttnTo: new FormControl(''),
      billingAddress1: new FormControl(''),
      billingAddress2: new FormControl(''),
      billingCity: new FormControl(''),
      billingPhone: new FormControl(''),
      billingState: new FormControl(''),
      billingZip: new FormControl('')
    });
  }
  get createCompanyFormControls() { return this.createCompanyForm.controls; }
  create(form) {
    console.log(form.value);
  }
}
