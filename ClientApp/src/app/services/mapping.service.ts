import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MappingService {
    UID = '';
    constructor(
        public http: HttpClient,
        @Inject('BASE_URL') public AppUrl: string
    ) { }

    ChannelEmailData(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/ChannelEmailData';
        return http.get(url).pipe();
    }

    GetDeviceChannelMapping(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetDeviceChannelMapping';
        return http.get(url).pipe();
    }

    InsertDeviceChannelMapping(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/InsertDeviceChannelMapping';
        return http.post(url, data).pipe();
    }
    InsertEmailChannelMapping(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/InsertEmailChannelMapping';
        return http.post(url, data).pipe();
    }
    UpdateEmailChannelMapping(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/UpdateEmailChannelMapping';
        return http.post(url, data).pipe();
    }


    UpdateDeviceChannelMapping(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/UpdateDeviceChannelMapping';
        return http.post(url, data).pipe();
    }

    GetUserChannelMapping(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetUserChannelMapping';
        return http.get(url).pipe();
    }

    InsertUserChannelMapping(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/InsertUserChannelMapping';
        return http.post(url, data).pipe();
    }

    UpdateUserChannelMapping(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/UpdateUserChannelMapping';
        return http.post(url, data).pipe();
    }

    DeleteMapping(UID: any, DeleteType: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/DeleteMapping';
        return http
            .get(url, {
                params: {
                    UID: UID,
                    type: (DeleteType == 0) ? "Device" :DeleteType==1? "User":"Email"
                }
            })
            .pipe();
    }
    
    DeleteAllMapping(UID: any, DeleteType: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/DeleteAllMapping';
        return http
            .get(url, {
                params: {
                    UID: UID,
                    type: (DeleteType == 0) ? "Device" : "User"
                }
            })
            .pipe();
    }
}
