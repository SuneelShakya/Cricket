import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
    UID = '';
    message = '';
    rootarray: any[];
    constructor(
        public http: HttpClient,
        @Inject('BASE_URL') public AppUrl: string
    ) { }

    GetAllUsers(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetAllUsers';
        return http
            .get(url, {
                params: {
                    searchkey: '@',
                    username: '@',
                    roleid: '@',
                    groupid: '@'
                }
            })
            .pipe();
    }

    GetAllChannels(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetAllChannels';
        return http.get(url).pipe();
    }
    GetAllCategory():Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetEmailCategory';
        return http.get(url).pipe();
    }
    GetGroups(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetGroups';
        return http.get(url).pipe();
    }

    DeleteUserProfile(UID: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/DeleteUserProfile';
        return http
            .get(url, {
                params: {
                    UID: UID
                }
            })
            .pipe();
    }

    InsertUserProfile(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/InsertUserProfile';
        return http.post(url, data).pipe();
    }

    UpdateUserProfile(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/UpdateUserProfile';
        return http.post(url, data).pipe();
    }
    GetGeneralDetails() {
        const http = this.http;
        const url = this.AppUrl + "Shared/GetGeneralDetails";
        return http.get(url).pipe();
    }   
    GetLoginDetails() {
        const http = this.http;
        const url = this.AppUrl + "Shared/GetLoginDetails";
        return http.get(url).pipe();
    } 
    AssignedChannels() {
        const http = this.http;
        const url = this.AppUrl + "Shared/AssignedChannels";
        return http.get(url).pipe();
    }
    // GetCustomerDetails() {
    //     const http = this.http;
    //     const url = this.AppUrl + "Shared/GetCustomerDetails";
    //     return http.get(url).pipe();
    // }
}
