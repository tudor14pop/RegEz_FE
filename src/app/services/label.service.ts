import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Label } from '../models/label.model';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  locale = {};
  constructor(private http: HttpClient) { }

  load() {
    const params = new HttpParams().set('isoCode', 'EN');
    this.http.get<Label>(environment.serverUrl + '/label', {params}  ).subscribe(res => {
      res.labels.forEach(label => {
        this.locale[label.key] = label.value;
      });
    }, err => {
      console.log(err);
    });
  }
}
