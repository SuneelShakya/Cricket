import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QCService {
    ispanel = false;
    UID = '';
    TcProfile: any;
    rootarray: any[];
    constructor(
        public http: HttpClient,
        @Inject('BASE_URL') public AppUrl: string
    ) { }

    GetQCProfile(): Observable<any> {
        return this.http.get(this.AppUrl + 'Shared/GetQCProfile');
    }

    DeleteQCProfile(UID: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/DeleteQCProfile';
        return http
            .get(url, {
                params: {
                    UID: UID
                }
            })
            .pipe();
    }

    InsertQCProfile(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/InsertQCProfile';
        return http.post(url, data).pipe();
    }

    UpdateQCProfile(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/UpdateQCProfile';
        return http.post(url, data).pipe();
    }
}
