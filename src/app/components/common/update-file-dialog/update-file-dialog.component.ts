import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileService } from 'src/app/services/file.service';
import { LabelService } from 'src/app/services/label.service';

@Component({
  selector: 'app-update-file-dialog',
  templateUrl: './update-file-dialog.component.html',
  styleUrls: ['./update-file-dialog.component.scss']
})
export class UpdateFileDialogComponent implements OnInit {
  updateFileForm: FormGroup;
  fileToUpload = null;
  show = false;
  fileID = '';
  fileName = '';
  constructor(public matDialog: MatDialog,
              private fileService: FileService,
              public labelService: LabelService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.updateFileForm =  new FormGroup({
    uploadedFile: new FormControl(''),
    dateFrom: new FormControl(new Date()),
    dateTo: new FormControl(null),
    description: new FormControl(''),
    });
  }

  changeFileName(event) {
    this.fileToUpload = event.target.files.item(0);
    this.fileName = event.target.value.replace(/^.*\\/, '');
  }

  update(form) {
    this.matDialog.closeAll();
  }
}