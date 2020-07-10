import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FileService } from 'src/app/services/file.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-folder-dialog',
  templateUrl: './new-folder-dialog.component.html',
  styleUrls: ['./new-folder-dialog.component.scss']
})
export class NewFolderDialogComponent implements OnInit {
  newFolderForm: FormGroup;
  constructor(private fileService: FileService,
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
    this.fileService.createNewFolder(form.value).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

}
