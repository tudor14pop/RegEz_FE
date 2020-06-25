import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-external-dialog',
  templateUrl: './external-dialog.component.html',
  styleUrls: ['./external-dialog.component.scss']
})
export class ExternalDialogComponent implements OnInit {
  externalForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.externalForm = this.formBuilder.group({
      reminder: ''
    });
  }

  sendReminder(form) {
    this.matDialog.closeAll();
    console.log(form.value);
  }

}
