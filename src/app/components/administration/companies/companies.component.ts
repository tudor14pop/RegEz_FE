import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/Company';
import { AdministrationService } from 'src/app/services/administration.service';
import { CreateCompanyDialogComponent } from './create-company-dialog/create-company-dialog.component';
import { MatDialog } from '@angular/material/dialog';
declare var $: any;

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  companies: Company[] = [];
  constructor(private administrationService: AdministrationService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    $('.footable').footable();
    this.administrationService.getCompanies().subscribe(res => {
      this.companies = res;
    }, err => {
      console.log(err);
    });
  }
  openCreateCompanyDialog() {
    const dialogRef = this.dialog.open(CreateCompanyDialogComponent, {
      height:  '35rem',
      width: '60rem',
  });
  }
}
