import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import '../../../../scripts/daterangepicker.js';
import { FileService } from 'src/app/services/file.service.js';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { InfoPopupComponent } from '../info-popup.component.js';
declare var $: any;

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.scss']
})
export class UploadFileDialogComponent implements OnInit {
  newFileForm: FormGroup;
  fileToUpload = null;
  show = false;
  fileID = '';
  fileName = '';
  constructor(public matDialog: MatDialog,
              private fileService: FileService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.newFileForm =  new FormGroup({
    uploadedFile: new FormControl(''),
    fileName: new FormControl(''),
    validPeriod: new FormControl(''),
    dateFrom: new FormControl(new Date()),
    dateTo: new FormControl(null),
    description: new FormControl(''),
    path: new FormControl(''),
    versionable: new FormControl(''),
    });
  }

  changeFileName(event) {
    this.fileToUpload = event.target.files.item(0);
    this.fileName = event.target.value.replace(/^.*\\/, '');
  }

  upload(form) {
    this.matDialog.closeAll();
    const data = {
      file: this.fileToUpload,
      filePath: {
        description: form.value.description,
        validityTo: formatDate(form.value.dateTo, 'yyyy-MM-dd', 'en-US'),
        fileType: 'FILE',
        id: this.data.studyID,
        name: this.fileName,
        versionable: form.value.validPeriod ? true : false,
        path: form.value.path,
        validityFrom: form.value.dateFrom ? formatDate(form.value.dateFrom, 'yyyy-MM-dd', 'en-US') : formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      }
    };

    this.fileService.uploadFile(data).subscribe(res => {
      window.location.reload();
    }, err => {
      console.log(err);
    });
  }

  toggleDate() {
    this.show = !this.show;
  }

  private showError(errMessage: string) {
    this.dialog.open(InfoPopupComponent, {
        data: errMessage
    });
  }
}
