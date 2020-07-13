import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/models/Company';

@Component({
  selector: 'app-manage-company',
  templateUrl: './manage-company.component.html',
  styleUrls: ['./manage-company.component.scss']
})
export class ManageCompanyComponent implements OnInit {
  id: string;
  company: Company = new Company(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  editCompanyForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private companyService: CompanyService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.editCompanyForm = new FormGroup({
      name: new FormControl(''),
      address1: new FormControl(''),
      address2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(''),
      website: new FormControl(''),
      billingAddress1: new FormControl(''),
      billingAddress2: new FormControl(''),
      billingCity: new FormControl(''),
      billingState: new FormControl(''),
      billingZip: new FormControl(''),
      billingPhone: new FormControl(''),
    });
    setTimeout(() => {
    this.companyService.getCompanyByID(this.id).subscribe(res => {
     this.company = new Company(res.id, res.name, res.address1, res.address2, res.city, res.state, res.zip, res.website, res.billingAttnTo,
                                res. billingAddress1, res.billingAddress2, res.billingCity, res.billingState, res.billingZip, res.billingPhone);
     this.setForm(res);
    }, err => {
      console.log(err);
    });
   }, 500);

  }

  setForm(company) {
    this.editCompanyForm.controls.name.setValue(company.name);
    this.editCompanyForm.controls.address1.setValue(company.address1);
    this.editCompanyForm.controls.address2.setValue(company.address2);
    this.editCompanyForm.controls.city.setValue(company.city);
    this.editCompanyForm.controls.zip.setValue(company.zip);
    this.editCompanyForm.controls.state.setValue(company.state);
    this.editCompanyForm.controls.website.setValue(company.website);
    this.editCompanyForm.controls.billingAddress1.setValue(company.billingAddress1);
    this.editCompanyForm.controls.billingAddress2.setValue(company.billingAddress2);
    this.editCompanyForm.controls.billingCity.setValue(company.billingCity);
    this.editCompanyForm.controls.billingZip.setValue(company.billingZip);
    this.editCompanyForm.controls.billingState.setValue(company.billingState);
    this.editCompanyForm.controls.billingPhone.setValue(company.billingphone);
  }

  edit(form) {
    console.log(form.value);
  }
}
