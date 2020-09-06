import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DeviceService {
    data = '';
    filterDate: any = '';
    constructor(
        public http: HttpClient,
        @Inject('BASE_URL') public AppUrl: string
    ) { }

    GetSystems(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetSystems';
        return http.get(url).pipe();
    }

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

    GetUserDevices(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetUserDevices';
        return http
            .get(url, {
                params: {
                    Channel: "@", AllData: "1", status: "@", system: "@"
                }
            })
            .pipe();
    }

    DeleteDevices(UID: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/DeleteDevices';
        return http
            .get(url, {
                params: {
                    UID: UID
                }
            })
            .pipe();
    }

    InsertDevices(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/InsertDevices';
        return http.post(url, data).pipe();
    }
 
    UpdateDevices(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/UpdateDevices';
        return http.post(url, data).pipe();
    }
    CheckDevices(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/CheckDevices';
        return http.post(url, data).pipe();
    }
    HealthCheck(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/HealthCheck';
        return http.post(url, data).pipe();
    }

    SendReconcileDetails(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/SendReconcileDetails';
        return http.post(url, data).pipe();
    }
    ForceReconcile(ForceParameters) {
        return this.http.post('/Shared/ForceReconcile', ForceParameters);
      }
}
