import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ResourceService {
    data = '';
    constructor(
        public http: HttpClient,
        @Inject('BASE_URL') public AppUrl: string
    ) { }


    GetResourcesWithMount(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetResourcesWithMount';
        return http.get(url).pipe();
    }

    GetDiskFileSystem(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetDiskFileSystem';
        return http.post(url, data).pipe();
    }
    GetFileSystemSpace(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetFileSystemSpace';
        return http.post(url, data).pipe();
    }
    InsertResource(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/InsertResource';
        return http.post(url, data).pipe();
    }

    UpdateResource(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/UpdateResource';
        return http.post(url, data).pipe();
    }
    DeleteResource(UID: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/DeleteResource';
        return http
            .get(url, {
                params: {
                    UID: UID
                }
            })
            .pipe();
    }
}
