import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WorkFlowMasterService {
    data = '';
    constructor(
        public http: HttpClient,
        @Inject('BASE_URL') public AppUrl: string
    ) { }

    GetUserDevices(ChanelId: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetUserDevices';
        return http
            .get(url, {
                params: {
                    Channel: ChanelId, AllData: "0", status: "@", system: "@"
                }
            })
            .pipe();
    }

    GetChannels(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetAllChannels';
        return http.get(url).pipe();
    }
    ReplaceUndefined(val) {
        if (val == undefined || val == null || val == '[object Object]' || val == '@') return '';
        else return val;
    }

    GetWorkflowProcessConfig(Clipid: any, Channel: any, Device: any, Date1: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetWorkflowProcessConfig';
        return http
            .get(url, {
                params: {
                    Clipid: this.ReplaceUndefined(Clipid), Channel: this.ReplaceUndefined(Channel), Device: this.ReplaceUndefined(Device), Date: this.ReplaceUndefined(Date1)
                }
            })
            .pipe();
    }

    GetTcrDetailsWO(mdluid: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetTcrDetailsWO';
        return http
            .get(url, {
                params: {
                    mdluid: this.ReplaceUndefined(mdluid)
                }
            })
            .pipe();
    }

    GetBindSnpTagging(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetBindSnpTagging';
        return http
            .get(url, {
                params: {
                }
            })
            .pipe();
    }

    GetWorkOrderClips(Clipid: any, HouseId: any, status: any, EpisodeTitle: any, SeriesTitle: any, EpisodeNo: any, NOS: any, CreatedDate: any, UpdatedDate: any,ChannelUID:any,WoType:any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetWorkOrderClips';
        return http
            .get(url, {
                params: {
                    Clipid: this.ReplaceUndefined(Clipid), HouseId: this.ReplaceUndefined(HouseId), status: this.ReplaceUndefined(status),
                    EpisodeTitle: this.ReplaceUndefined(EpisodeTitle), SeriesTitle: this.ReplaceUndefined(SeriesTitle), EpisodeNo: this.ReplaceUndefined(EpisodeNo), NOS: this.ReplaceUndefined(NOS)
                    , Date: this.ReplaceUndefined(CreatedDate), Date1: this.ReplaceUndefined(UpdatedDate), FilterChannel: this.ReplaceUndefined(ChannelUID),WoType: this.ReplaceUndefined(WoType)
                }
            })
            .pipe();
    }

    GetWorkflowConfig(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetWorkflowConfig';
        return http.get(url).pipe();
    }

    DeleteWorkflowConfig(UID: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/DeleteWorkflowConfig';
        return http
            .get(url, {
                params: {
                    UID: UID
                }
            })
            .pipe();
    }


    InsertWorkflowConfig(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/InsertWorkflowConfig';
        return http.post(url, data).pipe();
    }

    UpdateWorkflowConfig(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/UpdateWorkflowConfig';
        return http.post(url, data).pipe();
    }

    Insert_Update_Delete_WorkOrder(data: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/Insert_Update_Delete_WorkOrder';
        return http.post(url, data).pipe();
    }

    GetDistinctClips(): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/GetDistinctClips';
        return http.get(url).pipe();
    }

    Delete_WorkOrder(UID: any): Observable<any> {
        const http = this.http;
        const url = this.AppUrl + 'Shared/Delete_WorkOrder';
        return http
            .get(url, {
                params: {
                    UID: UID
                }
            })
            .pipe();
    }
}
