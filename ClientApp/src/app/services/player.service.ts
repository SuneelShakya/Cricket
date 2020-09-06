import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';

@Injectable()
export class PlayerService {
  constructor(public httpClient: HttpClient, @Inject('BASE_URL') public AppUrl: string, public sharedService: SharedService) { }
  getSession(): Observable<any> {
    const url = this.AppUrl + 'Shared/GetSession';
    return this.httpClient.get(url).pipe();
  }
  GetLanguage(): Observable<any> {
    const url = this.AppUrl + 'Player/GetLanguage';
    return this.httpClient.get(url).pipe();
  }
  GetAllMediaFiles(ClipId) {
    return this.httpClient
      .get('/Player/AudioFiles', {
        params: {
          ProxyPath: ClipId
        }
      })
      .pipe();
  }
  LoadSubtitles(ClipId, subLang) {
    const params = {
      // lang: ClipId + (subLang ? '-' + subLang : '')
      clipID: ClipId,
      lang: (subLang ? subLang : '')
    };
    return this.httpClient.post<any>('/Player/LoadSubtitles', params).pipe();
  }
  getTotalScenes(ClipId) {
    const url = this.AppUrl + 'Player/GetTotalScenes';
    return this.httpClient.get(url, { params: { clipid: ClipId } }).pipe();
  }
  LoadSegments(ClipId) {
    return this.httpClient
      .get('/Player/GetClipSegmentation', { params: { TapeId: ClipId } })
      .pipe();
  }
  updateSOM(som, clip) {
    return this.httpClient.get('/Player/UpdateSOM', {
      params: {
        som, clip
      }
    })
  }
  deleteTags(segSource, playerID) {
    return this.httpClient.post('/Player/DeleteTags', segSource, {
      params: {
        playerID

      }
    })
  }
  deleteSegments(segSource, playerID) {
    return this.httpClient.post('/Player/DeleteSegments', segSource, {
      params: {
        playerID

      }
    })
  }
  deleteSnP(snPSource, playerID) {
    return this.httpClient.post('/Player/DeleteSnP', snPSource, {
      params: {
        playerID

      }
    })
  }
  SavePreview(ClipId, preview, remark) {
    const clip = ClipId, prev = preview;
    return this.httpClient
      .get<any>('/Player/SavePreview', {
        params: { ClipId: clip, Preview: prev, Remark: remark }
      })
      .pipe();
  }
  SetQC(clip, qc) {
    return this.httpClient
      .get<any>('/Player/SetQC', {
        params: { clip, qc }
      })
      .pipe();
  }
  LoadTags(ClipId) {
    return this.httpClient
      .get('/Player/LoadTag', { params: { clipid: ClipId } })
      .pipe();
  }
  SaveSegments(segSource, ClipId) {
    return this.httpClient
      .post<any>('/Player/SaveSegments', segSource, {
        params: { TapeId: ClipId }
      })
      .pipe();
  }
  SaveTag(tagSource, ClipId) {
    return this.httpClient
      .post<any>('/Player/SaveTag', tagSource, { params: { clipid: ClipId } })
      .pipe();
  }
  handlesubFileInput(files: FileList, ClipId, subLang) {
    let fileToUpload = <File>files[0];
    const url = '/Player/UploadSrt';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(url, formData, {
        params: { lang: ClipId + (subLang ? '-' + subLang : '') },
        reportProgress: true,
        observe: 'events'
      })
      .pipe();
  }

  handleEDLFileInput(files: FileList) {
    let fileToUpload = <File>files[0];
    const url = '/Player/UploadEDL';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(url, formData)
      .pipe();
  }
  SaveSubtitles(subtitles, ClipId, path): Observable<string> {
    let postUrl = '/Player/SaveSubtitles';
    var formData = new FormData();
    formData.append('data', subtitles);
    formData.append('path', ClipId + path);
    return (this.httpClient.post<string>(postUrl, formData,
      { responseType: 'text' as 'json' }));
  }
  getQCParameters(teamid) {
    const url = this.AppUrl + 'Player/getQCParameters';
    return this.httpClient.get(url, {
      params: {
        teamid
      }
    }).pipe();
  }
  LoadQC(ClipId) {
    return this.httpClient
      .get('/Player/LoadQC', { params: { TapeId: ClipId } })
      .pipe();
  }
  LoadSnP(ClipId, type: any) {
    var tab = "@";
    if (this.sharedService.CallEpicForPalyer)
      tab = "epic";
    return this.httpClient
      .get('/Player/LoadSnP', { params: { TapeId: ClipId, type: type, tab: tab } })
      .pipe();
  }
  LoadTechQC(ClipId) {
    return this.httpClient
      .get('/Player/LoadTechQC', { params: { TapeId: ClipId } })
      .pipe();
  }
  SaveQC(QCSource) {
    return this.httpClient.post<any>('/Player/SaveQC', QCSource).pipe();
  }
  SaveSnP(clipid, finalsnP, snPSource, type) {
    return this.httpClient.post<any>('/Player/SaveSnP', snPSource, { params: { clipid, type, finalsnP } }).pipe();
  }
}