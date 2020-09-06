import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TransferService {
    data = '';
    constructor(
        public http: HttpClient,
        @Inject('BASE_URL') public AppUrl: string
    ) { }

    GetTransfers(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetTransfers';
        return http.get(url).pipe();
    }

    DeleteTransfers(UID: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/DeleteTransfers';
        return http
            .get(url, {
                params: {
                    UID: UID
                }
            })
            .pipe();
    }

    InsertTransfers(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/InsertTransfers';
        return http.post(url, data).pipe();
    }

    UpdateTransfers(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/UpdateTransfers';
        return http.post(url, data).pipe();
    }
}
