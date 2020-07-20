import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GeneralResponse } from '../models/GeneralResponse';
import { FolderStructure } from '../models/folder-structure.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  uploadFile(data) {
    const formData: FormData  = new FormData();
    formData.append('file', data.file);
    console.log(JSON.stringify(data.filePath));
    return this.http.post(environment.serverUrl + '/file-management/study/' + data.filePath.id +  '/new-file', formData ,
     {params: {filePath: JSON.stringify(data.filePath)}} );
  }
  createNewFolder(data) {
    console.log(JSON.stringify(data))
    return this.http.post(environment.serverUrl + '/file-management/study/' + data.id + '/new-folder', data );
  }
  downloadFile() {

  }

  retrieveFile(data) {
    return this.http.get(environment.serverUrl + '/file-management/study/' + data.studyID + '/file/' + data.fileID, {responseType: 'arraybuffer'});

  }

  retrieveFolderStructure(data): Observable<FolderStructure> {
    return this.http.get<FolderStructure> (environment.serverUrl + '/file-management/study/' + data + '/retrieve');

  }
}
