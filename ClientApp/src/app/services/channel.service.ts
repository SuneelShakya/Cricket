import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChannelService {
    data = '';
    constructor(
        public http: HttpClient,
        @Inject('BASE_URL') public AppUrl: string
    ) { }

    ConfigureAsrun(col,val,channel){
        const http = this.http;
        const url = this.AppUrl + 'Shared/ConfigureAsrun';
        return http.get(url,{
            params:{
                col:col,val:val,channel:channel
            }
        }).pipe();
    }

    GetLanguage(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetLanguage';
        return http.get(url).pipe();
    }

    GetUserDevices(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetUserDevices';
        return http
            .get(url, {
                params: {
                    Channel: "@", AllData: "0", status: "@", system: "@"
                }
            })
            .pipe();
    }

    GetChannels(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetAllChannels';
        return http.get(url).pipe();
    }

    GetAdminChannels(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetAdminChannels';
        return http.get(url).pipe();
    }

    DeleteChannels(UID: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/DeleteChannels';
        return http
            .get(url, {
                params: {
                    UID: UID
                }
            })
            .pipe();
    }

    GetMediaPrefixDetail(UID: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetMediaPrefixDetail';
        return http
            .get(url, {
                params: {
                    UID: UID
                }
            })
            .pipe();
    }

    GetLanguagebychnid(UID: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetLanguagebychnid';
        return http
            .get(url, {
                params: {
                    UID: UID
                }
            })
            .pipe();
    }

    InsertChannels(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/InsertChannels';
        return http.post(url, data).pipe();
    }

    UpdateChannels(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/UpdateChannels';
        return http.post(url, data).pipe();
    }
}
