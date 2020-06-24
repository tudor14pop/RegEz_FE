import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-e-sign-dialog',
  templateUrl: './e-sign-dialog.component.html',
  styleUrls: ['./e-sign-dialog.component.scss']
})
export class ESignDialogComponent implements OnInit {
  esignForm: FormGroup;
  @Input() index;
  constructor(private formBuilder: FormBuilder,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any
) {}

  ngOnInit() {
    this.esignForm = this.formBuilder.group({
      sponsorName: '',
      protocol: '',
      croName: '',
      nickName: '',
      indNumber: '',
      pInvestigator: '',
      sInvestigator: '',
      site: '',
      siteNumber: '',
      leadCRC: '',
      backupCRC: '',
    });
  }


  create(form) {
    this.matDialog.closeAll();
    console.log(form.value);
  }
}
