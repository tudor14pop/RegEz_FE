import { Component, OnInit } from '@angular/core';
import { LabelService } from './services/label.service';
import { Label } from './models/label.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'regEz';
  constructor() { }

  ngOnInit() {
  }

  getToken() {
    return localStorage.getItem('regEz.token');
 }
}
