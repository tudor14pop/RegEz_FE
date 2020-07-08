import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.scss']
})
export class UploadFileDialogComponent implements OnInit {
  newFileForm: FormGroup;
  constructor( private formBuilder: FormBuilder,
               public matDialog: MatDialog,) { }

  ngOnInit(): void {
    this.newFileForm = this.formBuilder.group({
    file: File,
    fileName: '',
    valiPeriod: null,
    deteFrom: '',
    dateTo: '',
    description: '',
    folderLocation: '',
    versionalble: null
    });
  }
  upload(form){
    this.matDialog.closeAll();
    console.log(form.value);
  }
}
