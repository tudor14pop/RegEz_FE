import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ESignDialogComponent } from './e-sign-dialog/e-sign-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  getColor() {
    return Math.round(Math.random() * 2);
 }

 openEsignDialog(index) {
   const dialogRef = this.dialog.open(ESignDialogComponent , {
     height: '50rem',
     width: '30rem',
     data: {
      index
    }
   });
 }
}
