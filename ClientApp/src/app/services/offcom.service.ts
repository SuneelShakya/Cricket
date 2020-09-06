import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OffComService {
  data = '';
  constructor(
    public http: HttpClient,
    @Inject('BASE_URL') public AppUrl: string
  ) { }

  GetChannelsForMapping(): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetChannelsForMapping';
    return http.get(url).pipe();
  }

  GetOffComs(): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetOffcomserverData';
    return http.get(url).pipe();
  }

  InsertOffComs(data: any): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/AddOffcomserverData';
    return http.post(url, data).pipe();
  }

  UpdateOffComs(data: any): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/UpdateOffcomserverData';
    return http.post(url, data).pipe();
  }

  DeleteOffComs(UID: any): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/DeleteOffComs';
    return http
      .get(url, {
        params: {
          UID: UID
        }
      })
      .pipe();
  }

  GetCustomerDetails(): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/GetCustomerDetails';
    return http.get(url).pipe();
}


UpdateAdminCustomerData(data: any): Observable<any> {
  const http = this.http;
  const url = this.AppUrl + 'Shared/UpdateAdminCustomerData';
  return http.post(url, data).pipe();
}
}
