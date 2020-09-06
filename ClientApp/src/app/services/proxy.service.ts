import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProxyService {
    ispanel = false;
    UID = '';
    TcProfile: any;
    rootarray: any[];
    constructor(
        public http: HttpClient,
        @Inject('BASE_URL') public AppUrl: string
    ) { }

    GetProxyProfile(): Observable<any> {
        return this.http.get(this.AppUrl + 'Shared/GetProxyProfile');
    }
    GetVODProfile(): Observable<any> {
        return this.http.get(this.AppUrl + 'Shared/GetVODProfile');
    }
    GetSubtitleProfile(): Observable<any> {
        return this.http.get(this.AppUrl + 'Shared/GetSubtitleProfile');
    }

    DeleteProxyProfile(UID: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/DeleteProxyProfile';
        return http
            .get(url, {
                params: {
                    UID: UID
                }
            })
            .pipe();
    }
    DeleteVODProfile(UID: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/DeleteVODProfile';
        return http
            .get(url, {
                params: {
                    UID: UID
                }
            })
            .pipe();
    }
    DeleteSubtitleProfile(UID: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/DeleteSubtitleProfile';
        return http
            .get(url, {
                params: {
                    UID: UID
                }
            })
            .pipe();
    }

    InsertProxyProfile(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/InsertProxyProfile';
        return http.post(url, data).pipe();
    }
    
    InsertVODProfile(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/InsertVODProfile';
        return http.post(url, data).pipe();
    }
    InsertSubtitleProfile(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/InsertSubtitleProfile';
        return http.post(url, data).pipe();
    }
    UpdateProxyProfile(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/UpdateProxyProfile';
        return http.post(url, data).pipe();
    }
    UpdateVODProfile(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/UpdateVODProfile';
        return http.post(url, data).pipe();
    }
    UpdateSubtitleProfile(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/UpdateSubtitleProfile';
        return http.post(url, data).pipe();
    }
}
