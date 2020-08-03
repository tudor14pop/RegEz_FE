import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FolderStructure } from '../models/folder-structure.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  uploadFile(data) {
    const formData: FormData  = new FormData();
    formData.append('file', data.file);
    return this.http.post(environment.serverUrl + '/file-management/study/' + data.filePath.id +  '/new-file', formData ,
     {params: {filePath: JSON.stringify(data.filePath)}} );
  }

  createNewFolder(data) {
    return this.http.post(environment.serverUrl + '/file-management/study/' + data.id + '/new-folder', data );
  }

  retrieveFile(data) {
    return this.http.get(environment.serverUrl + '/file-management/study/' + data.studyID + '/download/file/' + data.fileID, {responseType: 'arraybuffer'});

  }
  retrieveFileDetails(data) {
    return this.http.get(environment.serverUrl + '/file-management/study/' + data.studyID + '/file/' + data.fileID);

  }
  editFile(data, studyID) {
    return this.http.put(environment.serverUrl + '/file-management/study/' + studyID , data);

  }
  retrieveFolderStructure(data): Observable<FolderStructure> {
    return this.http.get<FolderStructure> (environment.serverUrl + '/file-management/study/' + data + '/retrieve');

  }

  downloadStudy(data) {
    return this.http.get(environment.serverUrl + '/file-management/archive/study/' + data, {responseType: 'arraybuffer'});
  }
}
