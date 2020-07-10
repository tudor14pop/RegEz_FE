import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-folder-dialog',
  templateUrl: './new-folder-dialog.component.html',
  styleUrls: ['./new-folder-dialog.component.scss']
})
export class NewFolderDialogComponent implements OnInit {
  newFolderForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.newFolderForm =  new FormGroup({
      folderName: new FormControl(''),
      folderLocation: new FormControl(''),
      });
  }

  upload(form) {
    console.log(form);
  }

}
