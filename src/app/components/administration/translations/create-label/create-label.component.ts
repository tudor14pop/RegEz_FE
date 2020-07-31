import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LabelService } from 'src/app/services/label.service';
declare var $: any;
@Component({
  selector: 'app-create-label',
  templateUrl: './create-label.component.html',
  styleUrls: ['./create-label.component.scss']
})
export class CreateLabelComponent implements OnInit {
  newLabelForm: FormGroup;

  constructor(public labelService: LabelService) { }

  ngOnInit(): void {
    $('.summernote').summernote();
    this.newLabelForm =  new FormGroup({
      labelName: new FormControl(''),
      comment: new FormControl(''),
      tags: new FormControl(''),
      editorType: new FormControl(''),
      labelContent: new FormControl(''),
      });
  }

}
