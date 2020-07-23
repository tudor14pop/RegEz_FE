import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LabelService } from 'src/app/services/label.service';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent implements OnInit {
  editLabelForm: FormGroup;
  id: string;
  constructor(public labelService: LabelService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.editLabelForm =  new FormGroup({
      labelName: new FormControl(this.labelService.localeList[this.id].key),
      comment: new FormControl(''),
      tags: new FormControl(''),
      editorType: new FormControl(''),
      labelContent: new FormControl(this.labelService.localeList[this.id].value),
      });
  }

  editLabel(form) {
    const data = {
        key: form.value.labelName,
        value: form.value.labelContent
    };
    this.labelService.update(data);
  }
}
