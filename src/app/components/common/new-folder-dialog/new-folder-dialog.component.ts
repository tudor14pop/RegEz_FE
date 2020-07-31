import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FileService } from 'src/app/services/file.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { InfoPopupComponent } from '../info-popup.component';

@Component({
  selector: 'app-new-folder-dialog',
  templateUrl: './new-folder-dialog.component.html',
  styleUrls: ['./new-folder-dialog.component.scss']
})
export class NewFolderDialogComponent implements OnInit {
  newFolderForm: FormGroup;
  constructor(private fileService: FileService,
              private matDialog: MatDialog,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.newFolderForm =  new FormGroup({
      folderName: new FormControl(''),
      id: new FormControl(this.data.studyID),
      fileType: new FormControl('FOLDER'),
      folderLocation: new FormControl(''),
      });
  }

  upload(form) {
    const data = {
      fileType: form.value.fileType,
      name: form.value.folderName,
      path: form.value.folderLocation,
      id: this.data.studyID
      };
      console.log(data)
    this.fileService.createNewFolder(data).subscribe(res => {
      // window.location.reload();
    }, err => {
      this.showError(err.errorMessage);
    });
  }
  private showError(errMessage: string) {
    this.dialog.open(InfoPopupComponent, {
        data: errMessage
    });
  }
}
