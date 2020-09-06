import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class EventsService {
    constructor(
        public http: HttpClient,
        @Inject('BASE_URL') public AppUrl: string
    ) { }

    archivedEvents(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Events/ArchivedEvents';
        return http.get(url).pipe();
    }
    addArchive(archive): Observable<any> {
        archive.Extension = archive.Extension.join();
        const http = this.http;
        const url = this.AppUrl + 'Events/AddArchive';
        return http.post(url, archive).pipe();
    }
    updateArchive(archive): Observable<any> {
        archive.Extension = archive.Extension.join();
        const http = this.http;
        const url = this.AppUrl + 'Events/UpdateArchive';
        return http.post(url, archive).pipe();
    }
    deleteArchive(uid): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Events/DeleteArchive';
        return http.get(url, {
            params: {
                uid
            }
        }).pipe();
    }

    deeparchivedEvents(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Events/DeepArchivedEvents';
        return http.get(url).pipe();
    }
    adddeepArchive(archive): Observable<any> {
        archive.Extension = archive.Extension.join();
        const http = this.http;
        const url = this.AppUrl + 'Events/AddDeepArchive';
        return http.post(url, archive).pipe();
    }
    updatedeepArchive(archive): Observable<any> {
        archive.Extension = archive.Extension.join();
        const http = this.http;
        const url = this.AppUrl + 'Events/UpdateDeepArchive';
        return http.post(url, archive).pipe();
    }
    deletedeepArchive(uid): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Events/DeleteDeepArchive';
        return http.get(url, {
            params: {
                uid
            }
        }).pipe();
    }

    housekeepingEvents(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Events/HousekeepingEvents';
        return http.get(url).pipe();
    }
    addHousekeeping(housekeeping): Observable<any> {
        housekeeping.Devices = housekeeping.Devices.join();
        const http = this.http;
        const url = this.AppUrl + 'Events/addHousekeeping';
        return http.post(url, housekeeping).pipe();
    }
    updateHousekeeping(housekeeping): Observable<any> {
        housekeeping.Devices = housekeeping.Devices.join();
        const http = this.http;
        const url = this.AppUrl + 'Events/UpdateHousekeeping';
        return http.post(url, housekeeping).pipe();
    }
    deleteHousekeeping(uid): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Events/DeleteHousekeeping';
        return http.get(url, {
            params: {
                uid
            }
        }).pipe();
    }

    missingtransferEvents(type): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Events/MissingTransferEvents';
        return http.get(url, {
            params: {
                type: type
            }
        }).pipe();
    }
    addmissingtransfer(missingtransfer, oftype): Observable<any> {
        missingtransfer.Source = missingtransfer.Source.join();
        missingtransfer.Extension = missingtransfer.Extension.join();
        const http = this.http;
        const url = this.AppUrl + 'Events/AddMissingTransfer';
        return http.post(url, missingtransfer, {
            params: {
                oftype: oftype
            }
        }).pipe();
    }
    updatemissingtransfer(missingtransfer): Observable<any> {
        missingtransfer.Source = missingtransfer.Source.join();
        missingtransfer.Extension = missingtransfer.Extension.join();
        const http = this.http;
        const url = this.AppUrl + 'Events/UpdateMissingTransfer';
        return http.post(url, missingtransfer).pipe();
    }
    deletemissingtransfer(uid): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Events/DeleteMissingTransfer';
        return http.get(url, {
            params: {
                uid
            }
        }).pipe();
    }
}