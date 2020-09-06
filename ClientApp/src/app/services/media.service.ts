import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MediaService {
  currentDataSource: any = [];
  tempclip: any = "";
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') public AppUrl: string
  ) { }



  GetMediaOperations(clipid: any): any {
    const http = this.http;
    const url = this.AppUrl + 'Media/GetMediaOperations';
    return http
      .get(url, {
        params: {
          ClipId: clipid
        }
      })
      .pipe();
  }

  GetMediaLocation(clipid: any): any {
    const http = this.http;
    const url = this.AppUrl + 'Media/GetClipLocations';
    return http
      .get(url, {
        params: {
          ClipId: clipid
        }
      })
      .pipe();
  }

  sendToVoDs(ClipId, LocalDirectory, UID, ext, dest){
    return this.http.get(this.AppUrl+'VNas/SendToVoDs',{
      params:{
        ClipId, LocalDirectory, UID, ext, dest
      }
    })
  }

  GetMediaLocationSubtitle(clipid: any): any {
    const http = this.http;
    const url = this.AppUrl + 'Media/GetClipLocationsSubtitle';
    return http
      .get(url, {
        params: {
          ClipId: clipid
        }
      })
      .pipe();
  }
  GetPhysicalMetadata(LiveMeta) {
    return this.http.post(this.AppUrl + 'Media/PhysicalMetadata', LiveMeta).pipe();
  }

  GetOnAirStatus(clipid: any): any {
    const http = this.http;
    const url = this.AppUrl + 'Media/GetOnAirStatus';
    return http
      .get(url, {
        params: {
          ClipId: clipid
        }
      })
      .pipe();
  }

  GetVoDs(): any {
    const http = this.http;
    const url = this.AppUrl + 'VNas/GetVoDs';
    return http
      .get(url)
      .pipe();
  }

  SendToDeleteMediaAllInstance(datas: any) {
    const http = this.http;
    const url = this.AppUrl + 'Media/SendToDeleteMediaAllInstance';
    return http.post(url, datas).pipe();
  }

  SendToDeleteMedia(clipid: any, deviceuid: any) {
    const http = this.http;
    const url = this.AppUrl + 'Media/SendToDeleteMedia';
    return http.get(url, {
      params: {
        clipid: clipid,
        deviceuid: deviceuid
      }
    }).pipe();
  }
  bulkOperations(files, BulkAction, srcDev, destDev) {
    let fileToUpload = <File>files[0];
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(this.AppUrl + 'Media/BulkOperations', formData, {
      params: {
        BulkAction: BulkAction,
        srcDev: srcDev,
        destDev: destDev
      }
    })
  }

  GetDistinctCategories() {
    const http = this.http;
    const url = this.AppUrl + 'Media/GetDistinctCategories';
    return http
      .get(url)
      .pipe();
  }

  GetAllMeta(clip) {
    const http = this.http;
    const url = this.AppUrl + 'Media/GetAllMeta';
    return http
      .get(url, {
        params: {
          clip
        }
      })
      .pipe();
  }

  updateMeta(ClipId, para) {
    const http = this.http;
    const url = this.AppUrl + 'Media/UpdateMeta';
    return http
      .post(url, para, {
        params: {
          ClipId
        }
      })
      .pipe();
  }
}
