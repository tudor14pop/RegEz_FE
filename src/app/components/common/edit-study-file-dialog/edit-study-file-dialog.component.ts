import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileService } from 'src/app/services/file.service';
import { formatDate } from '@angular/common';
import { StudyService } from 'src/app/services/http/study.service';

@Component({
  selector: 'app-edit-study-file-dialog',
  templateUrl: './edit-study-file-dialog.component.html',
  styleUrls: ['./edit-study-file-dialog.component.scss']
})
export class EditStudyFileDialogComponent implements OnInit {
  editFileForm: FormGroup;
  fileToUpload = null;
  show = false;
  fileID = '';
  fileName = '';
  constructor(public matDialog: MatDialog,
              private fileService: FileService,
              private dialog: MatDialog,
              private studyService: StudyService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.editFileForm =  new FormGroup({
    fileName: new FormControl(this.data.fileName),
    validPeriod: new FormControl(false),
    dateFrom: new FormControl(new Date()),
    dateTo: new FormControl(null),
    description: new FormControl(''),
    versionable: new FormControl(false),
    });
  }

  toggleDate() {
    this.show = !this.show;
  }

  edit(form) {
    const data = {
        description: form.value.description,
        validityTo: formatDate(form.value.dateTo, 'yyyy-MM-dd', 'en-US'),
        id: this.data.fileID,
        name: form.value.fileName,
        versionable: form.value.validPeriod ? true : false,
        validityFrom: form.value.dateFrom ? formatDate(form.value.dateFrom, 'yyyy-MM-dd', 'en-US') : formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
    }
    this.fileService.editFile(data, this.data.studyID).subscribe(res => {
        this.matDialog.closeAll();
        this.studyService.showSuccess()
    }, err => {
      console.log(err);
      this.matDialog.closeAll();
      this.studyService.showError('Something went wrong. Please try again.')
    })
  }
}
