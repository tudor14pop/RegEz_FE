import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GeneralResponse } from '../models/GeneralResponse';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  uploadFile(data): Observable<GeneralResponse> {
    return this.http.post<GeneralResponse>(environment.serverUrl + '/file-management/new-file', data);
  }

  downloadFile() {

  }

  retrieveFolderStructure() {

  }
}
