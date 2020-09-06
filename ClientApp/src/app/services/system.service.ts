import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SystemService {
    data = '';
    constructor(
        public http: HttpClient,
        @Inject('BASE_URL') public AppUrl: string
    ) { }

    GetSystemTypes(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetSystemTypes';
        return http.get(url).pipe();
    }

    GetSystemOS(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetSystemOS';
        return http.get(url).pipe();
    }

    GetSystems(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetSystems';
        return http.get(url).pipe();
    }

    DeleteSystems(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/InsertSystems';
        return http.post(url, data).pipe();
    }

    InsertSystems(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/InsertSystems';
        return http.post(url, data).pipe();
    }

    UpdateSystems(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/InsertSystems';
        return http.post(url, data).pipe();
    }

  checkSystemStatus(data: any): Observable<any> {
    const http = this.http;
    const url = this.AppUrl + 'Shared/ConnectionStatus';
    return http.post(url, data).pipe();
  }
}
