import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GroupService {
    UID = '';
    constructor(
        public http: HttpClient,
        @Inject('BASE_URL') public AppUrl: string
    ) { }

    saveAsJson(data: any, filename: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/saveAsJson';
        return http.post(url, data, {
            params: {
                filename: filename
            }
        }).pipe();
    }

    getJSON(jsonname: any, jsontype: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetJson';
        return http
            .get(url, {
                params: {
                    filetype: jsontype,
                    filename: jsonname
                }
            })
            .pipe();
    }

    GetGroups(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetGroups';
        return http.get(url).pipe();
    }

    DeleteGroup(UID: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/DeleteGroup';
        return http
            .get(url, {
                params: {
                    UID: UID
                }
            })
            .pipe();
    }

    InsertGroupMapping(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/InsertGroupMapping';
        return http.post(url, data).pipe();
    }

    UpdateGroupMapping(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/UpdateGroupMapping';
        return http.post(url, data).pipe();
    }

    GetDashboardData(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetDashboardData';
        return http.post(url, data).pipe();
    }
}
