import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CompanyService} from 'src/app/services/http/company.service';
import {SiteService} from "../../../../services/http/site.service";
import {Site} from "../../../../models/Site";
import {CompanyDetailsDto} from "../../../../models/company/CompanyDetailsDto";
import {Company} from "../../../../models/company/Company";

@Component({
    selector: 'app-manage-company',
    templateUrl: './manage-company.component.html',
    styleUrls: ['./manage-company.component.scss']
})
export class ManageCompanyComponent implements OnInit {
    id: string;
    companyDetailsDto: CompanyDetailsDto;
    editCompanyForm: FormGroup;
    sites: Site[] = [];

    constructor(private route: ActivatedRoute,
                private companyService: CompanyService,
                private formBuilder: FormBuilder,
                private siteService: SiteService
    ) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params.id;
        });
        this.editCompanyForm = this.formBuilder.group({
            name: ['', Validators.required],
            address1: ['', Validators.required],
            address2: '',
            city: '',
            id: '',
            state: '',
            zip: '',
            website: '',
            billingAddress1: '',
            billingAddress2: '',
            billingCity: '',
            billingState: '',
            billingZip: '',
            billingPhone: '',
        });
        this.siteService.getall(this.id).subscribe(res => this.sites = res);
            this.companyService.getByID(this.id).subscribe(res => {
                this.companyDetailsDto = res;
                this.setEditCompanyForm(res.company)
            }, err => {
                console.log(err);
            });
    }

    setEditCompanyForm(company: Company) {
        this.editCompanyForm.controls.id.setValue(company.id);
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
        this.editCompanyForm.controls.billingPhone.setValue(company.billingPhone);
    }

    update() {
        if (this.editCompanyForm.valid) {
            this.companyService.update(this.editCompanyForm.value).subscribe(
                res => {
                    if (res.errorMessage) {
                        this.siteService.showError(res.errorMessage);
                    } else {
                        console.log(res);
                    }
                },
                err => {
                    this.siteService.showError(err.error.substr(err.error.indexOf('message: ') + 9));
                }
            );
        } else {
            this.editCompanyForm.markAllAsTouched();
        }
    }
}
