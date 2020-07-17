import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company/Company';
import { AdministrationService } from 'src/app/services/administration.service';
import { forkJoin } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { InviteUserDialogComponent } from './invite-user-dialog/invite-user-dialog.component';
import {CompanyDetailsDto} from "../../../models/company/CompanyDetailsDto";
import {UserService} from "../../../services/user.service";
declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userList: UserModel[] = [];
  companiesDetails: CompanyDetailsDto [] = [];
  constructor(
      private administrationService: AdministrationService,
      private userService: UserService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    $('.footable').footable();
    const users = this.userService.getUsers();
    const companies = this.administrationService.getCompanies();
    forkJoin([users, companies]).subscribe(res => {
      res[0].forEach(user => {
        const newUser: UserModel = new UserModel(user.id, user.accountStatus, user.company, user.firstName, user.lastName, user.modified);
        this.userList.push(newUser);
      });
      res[1].forEach(company => {
        this.companiesDetails.push(company);
      });
      }, err => {
      console.log(err);
    });
  }

  openInviteUserDialog() {
    const dialogRef = this.dialog.open(InviteUserDialogComponent, {
      height: '45rem',
      width: '30rem',
  });
  }

}
