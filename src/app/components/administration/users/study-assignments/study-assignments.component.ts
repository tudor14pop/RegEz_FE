import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/http/user.service';
import { UserModel } from 'src/app/models/user.model';
import { CompanyService } from 'src/app/services/http/company.service';
import { CompanyDetailsDto } from 'src/app/models/company/CompanyDetailsDto';
import { forkJoin } from 'rxjs';
import { StudyService } from 'src/app/services/http/study.service';
import { InitDashboardDto } from 'src/app/models/InitDashboardDto';
import { MatDialog } from '@angular/material/dialog';
import { AddRoleDialogComponent } from './add-role-dialog/add-role-dialog.component';

declare var $: any;
@Component({
  selector: 'app-study-assignments',
  templateUrl: './study-assignments.component.html',
  styleUrls: ['./study-assignments.component.scss']
})
export class StudyAssignmentsComponent implements OnInit {
  users: UserModel[] = [];
  companiesDetails: CompanyDetailsDto[] = [];
  dashboardDTO: InitDashboardDto;
  constructor(private userService: UserService,
              private dialog: MatDialog,
              private studyService: StudyService,
              private companyService: CompanyService) { }

  ngOnInit(): void {
    const users = this.userService.getUsers();
    const companies = this.companyService.getAll();
    forkJoin([users, companies]).subscribe(res => {
      res[0].forEach(user => {
          const newUser: UserModel = new UserModel(user.id, user.accountStatus, user.company, user.firstName, user.lastName, user.modified);
          this.users.push(newUser);
      });
      res[1].forEach(company => {
          this.companiesDetails.push(company);
      });
  }, err => {
      console.log(err);
    });
    setTimeout(() => {
      $('.footable').footable();
    }, 0);

    this.studyService.getStudies().subscribe(res => {
      this.dashboardDTO = res;
    }, err => {
      console.log(err);
    });
  }

  openAddRoleDialog(person, study) {
    const dialogRef = this.dialog.open(AddRoleDialogComponent , {
      height: '21rem',
      width: '30rem',
      data: {
          study,
          user: person

      }
  });
  }

}
