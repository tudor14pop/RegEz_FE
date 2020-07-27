import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ESignDialogComponent } from './e-sign-dialog/e-sign-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { InternalDialogComponent } from './internal-dialog/internal-dialog.component';
import { ExternalDialogComponent } from './external-dialog/external-dialog.component';
import { LabelService } from 'src/app/services/label.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {

  constructor(public dialog: MatDialog,
              public labelService: LabelService
    ) {}

  ngOnInit(): void {
  }

  getColor() {
    return Math.round(Math.random() * 2);
 }

 openEsignDialog(index) {
   const dialogRef = this.dialog.open(ESignDialogComponent , {
     height: '40rem',
     width: '30rem',
     panelClass: 'custom-dialog-container',
     data: {
      index
    }
   });
 }

 openInternalDialog(index) {
  const dialogRef = this.dialog.open(InternalDialogComponent , {
    height: '50rem',
    width: '40rem',
    panelClass: 'custom-dialog-container',
    data: {
     index
   }
  });
}

openExternalDialog(index) {
  const dialogRef = this.dialog.open(ExternalDialogComponent , {
    height: '50rem',
    width: '40rem',
    panelClass: 'custom-dialog-container',
    data: {
     index
   }
  });
}
}
