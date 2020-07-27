import {Component, OnInit} from '@angular/core';
import {CreateCompanyDialogComponent} from './create-company-dialog/create-company-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CompanyDetailsDto} from "../../../models/company/CompanyDetailsDto";
import {UserService} from "../../../services/http/user.service";
import {UserModel} from "../../../models/user.model";
import {CompanyService} from "../../../services/http/company.service";
import {User} from "../../../models/user/User";

declare var $: any;

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
    companiesDetails: CompanyDetailsDto[] = [];
    users: User[] = [];

    constructor(
        private companyService: CompanyService,
        private userService: UserService,
        private dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        $('.footable').footable();
        this.companyService.getAll().subscribe(res => {
            this.companiesDetails = res;
        }, err => {
            console.log(err);
        });
        this.userService.getAll().subscribe(res => {
            this.users = res;
        });
    }

    openCreateCompanyDialog() {
        const dialogRef = this.dialog.open(CreateCompanyDialogComponent, {
            height: '35rem',
            width: '60rem',
        });
    }
}
