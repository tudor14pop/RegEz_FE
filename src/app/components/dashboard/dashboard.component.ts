
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewStudyDialogComponent } from './new-study-dialog/new-study-dialog.component';
import { Router } from '@angular/router';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  clicked = [].fill(false);

    constructor(public dialog: MatDialog,
                private router: Router) {}
      
  openDialog() {
    const dialogRef = this.dialog.open(NewStudyDialogComponent , {
      height: '50rem',
      width: '30rem'
    });
  }

    openNewStudyDialog() {
        const dialogRef = this.dialog.open(NewStudyDialogComponent, {
            height: '50rem',
            width: '30rem'
        });
    }

    ngOnInit() {
    }

    showPopup(i) {
        this.clicked[i] = !this.clicked[i];
    }
}
