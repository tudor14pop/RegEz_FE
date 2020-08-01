import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileService } from 'src/app/services/file.service';

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
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.editFileForm =  new FormGroup({
    fileName: new FormControl(this.data.fileName),
    validPeriod: new FormControl(false),
    dateFrom: new FormControl(new Date()),
    dateTo: new FormControl(null),
    description: new FormControl(''),
    path: new FormControl(''),
    versionable: new FormControl(false),
    });
  }

  toggleDate() {
    this.show = !this.show;
  }

  edit(form) {
    console.log(form.value);
  }
}
