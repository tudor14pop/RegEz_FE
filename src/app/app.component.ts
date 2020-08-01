import { Component, OnInit } from '@angular/core';
import { LabelService } from './services/label.service';
import { Label } from './models/label.model';
import { BnNgIdleService } from 'bn-ng-idle';
import { AuthenticationService } from './services/auth/AuthenticationService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'regEz';
  constructor(private bnIdle: BnNgIdleService, private authService: AuthenticationService) { 
    this.bnIdle.startWatching(900).subscribe((res) => {
      if(res) {
        authService.logout();
      }
    })
  }

  ngOnInit() {
  }

  getToken() {
    return localStorage.getItem('regEz.token');
 }
}
