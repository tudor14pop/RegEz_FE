import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor( private http: HttpClient) { }

  getCompanyByID(id) {
    return this.http.get<Company>(environment.serverUrl + '/company', {params: {id}});

  }
}
