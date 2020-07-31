import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {StudyRoles} from 'src/app/models/user/StudyRoles';
import { LabelService } from 'src/app/services/label.service';
declare var $: any;
@Component({
  selector: 'app-add-role-dialog',
  templateUrl: './add-role-dialog.component.html',
  styleUrls: ['./add-role-dialog.component.scss']
})
export class AddRoleDialogComponent implements OnInit {
  accounts = Object.values(StudyRoles);
  addRoleForm: FormGroup;
  constructor( @Inject(MAT_DIALOG_DATA) public data,
               public labelService: LabelService) { }

  ngOnInit(): void {
    $('.select2_demo_2').select2({
      theme: 'bootstrap4',
      placeholder: this.labelService.locale['ADMINISTRATION_USERS_STUDY_ASSIGNMENTS_SELECT_ROLE']
    });
    this.accounts.forEach((role, i) => {
      const newOption = new Option(role, Object.keys(StudyRoles)[i] , false, false);
      $('.select2_demo_2').append(newOption).trigger('change');
    });
  }

  addRoles() {
    console.log($('.select2_demo_2').val());
  }

}
