import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GeneralResponse } from '../models/GeneralResponse';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  uploadFile(data) {
    const formData: FormData  = new FormData();
    formData.append('multipartFile', data.file);
    formData.append('request', data.request);
    return this.http.post(environment.serverUrl + '/file-management/new-file', formData);
  }

  createNewFolder(data) {
    return this.http.post(environment.serverUrl + '/file-management/new-folder', data);
  }

  downloadFile() {

  }

  retrieveFolderStructure(data) {
    return this.http.get(environment.serverUrl + '/file-management/study/' + data + '/retrieve');

  }
}
