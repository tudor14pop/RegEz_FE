import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {StudyRoles} from 'src/app/models/user/StudyRoles';
declare var $: any;
@Component({
  selector: 'app-add-role-dialog',
  templateUrl: './add-role-dialog.component.html',
  styleUrls: ['./add-role-dialog.component.scss']
})
export class AddRoleDialogComponent implements OnInit {
  accounts = Object.values(StudyRoles);
  addRoleForm: FormGroup;
  constructor( @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    $('.select2_demo_2').select2({
      theme: 'bootstrap4',
      placeholder: 'Select Role'
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
