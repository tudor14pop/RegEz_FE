import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {InviteUserDialogComponent} from './invite-user-dialog/invite-user-dialog.component';
import {CompanyDetailsDto} from "../../../models/company/CompanyDetailsDto";
import {UserService} from "../../../services/http/user.service";
import {CompanyService} from "../../../services/http/company.service";
import {User} from "../../../models/user/User";

declare var $: any;

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    userList: User[] = [];
    companyDetailsDtos: CompanyDetailsDto [] = [];

    constructor(
        private companyService: CompanyService,
        private userService: UserService,
        private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.initUsers();
        this.initCompany();
    }

    private initUsers() {
        this.userService.getAll().subscribe(res => {
                this.userList = res;
            },
            err => {
                this.userService.showError(err.error.substr(err.error.indexOf('message: ') + 9));
            }
        );
    }

    private initCompany() {
        this.companyService.getAll().subscribe(res => {
                this.companyDetailsDtos = res;
            },
            err => {
                this.companyService.showError(err.error.substr(err.error.indexOf('message: ') + 9));
            }
        );
    }

    openInviteUserDialog() {
        const dialogRef = this.dialog.open(InviteUserDialogComponent, {
            height: '45rem',
            width: '30rem',
            data: this.companyDetailsDtos
        });
        const sub = dialogRef.componentInstance.onUserAdded.subscribe(() => {
            this.initUsers();
        });
    }

}
