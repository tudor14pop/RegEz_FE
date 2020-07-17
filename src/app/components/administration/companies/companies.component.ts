import {Component, OnInit} from '@angular/core';
import {AdministrationService} from 'src/app/services/administration.service';
import {CreateCompanyDialogComponent} from './create-company-dialog/create-company-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CompanyDetailsDto} from "../../../models/company/CompanyDetailsDto";
import {UserService} from "../../../services/user.service";
import {UserModel} from "../../../models/user.model";

declare var $: any;

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
    companiesDetails: CompanyDetailsDto[] = [];
    users: UserModel[] = []

    constructor(
        private administrationService: AdministrationService,
        private userService: UserService,
        private dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        $('.footable').footable();
        this.administrationService.getCompanies().subscribe(res => {
            this.companiesDetails = res;
        }, err => {
            console.log(err);
        });
        this.userService.getUsers().subscribe(res => {
            this.users = res;
        })
    }

    openCreateCompanyDialog() {
        const dialogRef = this.dialog.open(CreateCompanyDialogComponent, {
            height: '35rem',
            width: '60rem',
        });
    }
}
