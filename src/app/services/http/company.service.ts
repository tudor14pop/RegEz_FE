import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {RootHttpService} from "./root.http.service";
import {Observable} from "rxjs";
import {CompanyDetailsDto} from "../../models/company/CompanyDetailsDto";
import {Company} from "../../models/company/Company";

@Injectable({
    providedIn: 'root'
})
export class CompanyService extends RootHttpService {

    getByID(id): Observable<CompanyDetailsDto> {
        return this.http.get<CompanyDetailsDto>(environment.serverUrl + '/company', {params: {id}});
    }

    getAll(): Observable<Array<CompanyDetailsDto>> {
        return this.http.get<Array<CompanyDetailsDto>>(environment.serverUrl + '/company/all');
    }

    update(company: Company): Observable<Company> {
        return this.http.put<Company>(environment.serverUrl + '/company', company);
    }
}
