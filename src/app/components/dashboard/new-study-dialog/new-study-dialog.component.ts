import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-new-study-dialog',
  templateUrl: './new-study-dialog.component.html',
  styleUrls: ['./new-study-dialog.component.scss']
})
export class NewStudyDialogComponent implements OnInit {
  newStudyForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private matDialog: MatDialog) {}

  ngOnInit() {
    this.newStudyForm = this.formBuilder.group({
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
