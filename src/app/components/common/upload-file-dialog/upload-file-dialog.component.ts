import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import '../../../../scripts/daterangepicker.js';
import { FileService } from 'src/app/services/file.service.js';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.scss']
})
export class UploadFileDialogComponent implements OnInit {
  newFileForm: FormGroup;
  fileToUpload = null;
  fileID = '';
  fileName = '';
  constructor(public matDialog: MatDialog,
              private fileService: FileService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

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
      request: {
        description: form.value.description,
        validityTo: form.value.dateTo,
        fileType: 'FILE',
        id: this.data.studyID,
        name: this.fileName,
        versionable: form.value.validPeriod ? true : false,
        validityFrom: form.value.dateFrom ? form.value.dateFrom : Date(),
      }
    };
    console.log(data);
    this.fileService.uploadFile(data).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
}
