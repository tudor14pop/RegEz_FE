import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudyService } from 'src/app/services/http/study.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassForm: FormGroup;
  constructor(private router: Router,
              private studyService: StudyService) { }

  ngOnInit(): void {
    this.forgotPassForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  forgot(form){
    this.router.navigate(['/login']);
    this.studyService.showSuccess();
  }
}
