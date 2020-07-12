import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { Company } from '../models/Company';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(environment.serverUrl + '/user/all');
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(environment.serverUrl + '/company/all');
  }
}
