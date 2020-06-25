import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-internal-dialog',
  templateUrl: './internal-dialog.component.html',
  styleUrls: ['./internal-dialog.component.scss']
})
export class InternalDialogComponent implements OnInit {
  internalForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.internalForm = this.formBuilder.group({
      reminder: ''
    });
  }

  sendReminder(form) {
    this.matDialog.closeAll();
    console.log(form.value);
  }

}
