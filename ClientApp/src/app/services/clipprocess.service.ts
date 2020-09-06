import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ClipprocesslistService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') public AppUrl: string
  ) { }

  private messageSource = new BehaviorSubject(false);
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: boolean) {
    this.messageSource.next(message);
  }
  uploadPlaylist(files, selectChannelsModal, selectDate, selectOverwrite, convertRule) {
    let fileToUpload;
    const formData: FormData = new FormData();    
    if(convertRule=='mnx'){
      Array.prototype.forEach.call(files, function (file) {
        formData.append('file', file, file.name);
      });
    }
    else{
      fileToUpload = <File>files[0];
      formData.append('file', fileToUpload, fileToUpload.name);      
    }
    return this.http.post('/Playlist/UploadPlaylistAsync', formData, {
      params: {
        selectChannelsModal: selectChannelsModal, selectDate:selectDate,
        selectOverwrite: selectOverwrite, convertRule:convertRule
      }
    }).pipe();
  }
  uploadPPsheet(files,ppType) {
    const formData: FormData = new FormData();
    Array.prototype.forEach.call(files, function (file) {
      formData.append('file', file, file.name);
    });
    return this.http.post('/Playlist/ClipProcessUploadFiles', formData,{
      params:{
        ppType
      }
    }).pipe();
  }
}