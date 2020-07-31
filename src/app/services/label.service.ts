import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Label } from '../models/label.model';
import { StudyService } from './http/study.service';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  locale = {};
  localeList = [];
  constructor(private http: HttpClient,
              private studyService: StudyService) { }

  load() {
    const params = new HttpParams().set('isoCode', 'EN');
    this.http.get<Label>(environment.serverUrl + '/label/retrieve', {params}  ).subscribe(res => {
      res.labels.forEach(label => {
        this.locale[label.key] = label.value;
        this.localeList.push(label);
      });
    }, err => {
      console.log(err);
    });
    console.log(this.localeList);
  }

  update(data) {
    const params = new HttpParams().set('isoCode', 'EN');
    return this.http.post<Label>(environment.serverUrl + '/label', data, {params}).subscribe(res => {
      this.localeList = [];
      res.labels.forEach(label => {
        this.locale[label.key] = label.value;
        this.localeList.push(label);
      });
      this.studyService.showSuccess()
    }, err => {
      console.log(err);
    });
  }
}
