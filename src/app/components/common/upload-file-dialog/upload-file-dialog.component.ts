import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import '../../../../scripts/daterangepicker.js';
import { FileService } from 'src/app/services/file.service.js';
declare var $: any;

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.scss']
})
export class UploadFileDialogComponent implements OnInit {
  newFileForm: FormGroup;
  fileToUpload = null;
  fileName = '';
  constructor(public matDialog: MatDialog,
              private fileService: FileService) { }

  ngOnInit(): void {
    this.newFileForm =  new FormGroup({
    uploadedFile: new FormControl(''),
    fileName: new FormControl(''),
    validPeriod: new FormControl(''),
    dateFrom: new FormControl(''),
    dateTo: new FormControl(''),
    description: new FormControl(''),
    folderLocation: new FormControl(''),
    versionable: new FormControl(''),
    });
  }

  changeFileName(event) {
    this.fileToUpload = event.target.files.item(0);
    this.fileName = event.target.value.replace(/^.*\\/, '');
  }

  upload(form){
    this.matDialog.closeAll();
    const data = {
      file: this.fileToUpload,
      fileUploadRequest: {
        description: form.value.description,
        expirationDate: form.value.dateTo,
        name: form.value.fileName,
        type: form.value.validPeriod ? 'VERSIONED' : 'UNVERSIONED',
        validFrom: form.value.dateFrom ? form.value.dateFrom : Date(),
      }
    };
    this.fileService.uploadFile(data).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
}
