import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {CompanyDetailsDto} from "../models/company/CompanyDetailsDto";

@Injectable({
    providedIn: 'root'
})
export class AdministrationService {

    constructor(private http: HttpClient) {
    }

    getCompanies(): Observable<Array<CompanyDetailsDto>> {
        return this.http.get<Array<CompanyDetailsDto>>(environment.serverUrl + '/company/all');
    }
}
