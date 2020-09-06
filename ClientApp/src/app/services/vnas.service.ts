import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class VNasService {
    public RenderTrans: any = true;
    public RenderVolume: any = true;
    public FilterOnTrans=false;
    tabindex:any;

    constructor(
        public httpClient: HttpClient,
        @Inject('BASE_URL') public AppUrl: string
    ) { }

    Jobstatus(dynamicurl) {
        const http = this.httpClient;
        const url = this.AppUrl + dynamicurl;
        return http.get(url).pipe();
    };
    VolumeStatus() {
        const http = this.httpClient;
        const url = this.AppUrl + "VNas/Volumestatus";
        return http.get(url).pipe();
    }
    LTOEvent() {
        const http = this.httpClient;
        const url = this.AppUrl + "VNas/LTOEvent";
        return http.get(url).pipe();
    }

    CompletedJobCount() {
        const http = this.httpClient;
        const url = this.AppUrl + "VNas/CompletedJobCount";
        return http.get(url).pipe();
    }


    private messageSource = new BehaviorSubject<any>("");
    currentMessage = this.messageSource.asObservable();
    sendtoTransection(message: any) {
        this.messageSource.next(message)
    }
    private messageSourceV = new BehaviorSubject<any>("");
    currentMessageV = this.messageSourceV.asObservable();
    sendtoVolume(message: any) {
        this.messageSourceV.next(message)
    }

    GetTransactionData(volume: any, Jobname: any, jobtyp: any, Status: any, NoOfRecords: any, pageNO: any, brickID: any) {
        const http = this.httpClient;
        const url = this.AppUrl + "VNas/TransactionDataByID";
        return http.get(url, {
            params: {
                VolumeName: volume,
                jobname: Jobname,
                status: Status,
                jobtype: jobtyp,
                brickid: brickID,
                pageNumber: pageNO,
                NoOfRecordsPerPage: NoOfRecords
            }
        }).pipe();
    };
      GetTransactionRestoreData(volume: any, Jobname: any, jobtyp: any, Status: any, NoOfRecords: any, pageNO: any) {
        const http = this.httpClient;
        const url = this.AppUrl + "VNas/TransactionRestoreDataByID";
        return http.get(url, {
            params: {
                VolumeName: volume,
                jobname: Jobname,
                status: Status,
                jobtype: jobtyp,
                pageNumber: pageNO,
                NoOfRecordsPerPage: NoOfRecords
            }
        }).pipe();
    };
    totalTransactionData(volume: any, Jobname: any, jobtyp: any, Status: any, NoOfRecords: any, pageNO: any, brickID: any) {
        const http = this.httpClient;
        const url = this.AppUrl + "VNas/totalTransactionDataByID";
        return http.get(url, {
            params: {
                VolumeName: volume,
                jobname: Jobname,
                status: Status,
                jobtype: jobtyp,
                brickid: brickID,
                pageNumber: pageNO,
                NoOfRecordsPerPage: NoOfRecords
            }
        }).pipe();
    };
    totalTransactionRestoreData(volume: any, Jobname: any, jobtyp: any, Status: any, NoOfRecords: any, pageNO: any) {
        const http = this.httpClient;
        const url = this.AppUrl + "VNas/totalTransactionRestoreDataByID";
        return http.get(url, {
            params: {
                VolumeName: volume,
                jobname: Jobname,
                status: Status,
                jobtype: jobtyp,
                pageNumber: pageNO,
                NoOfRecordsPerPage: NoOfRecords
            }
        }).pipe();
    };

    AllBrickStorage() {
        const http = this.httpClient;
        const url = this.AppUrl + "VNas/AllBrickStorage";
        return http.get(url).pipe();
    }
    
    ChangeBrickPriority(_priority:any,_brickid:any,_flag:any)
    {
        const http = this.httpClient;
        const url = this.AppUrl + "VNas/ChangeTransactionPriority";
        return http.get(url, {
            params: {
                Priority: _priority,
                jobname: _brickid,
                flag:_flag,
            }
        }).pipe();
    }
    
    AllVolumeStorage(_brickid:any,_volumeid:any,_action:any) {
        const http = this.httpClient;
        const url = this.AppUrl + "VNas/VolumeMasterChild";
        return http.get(url,{
            params: {
                BrickUID: _brickid,
                Volumeid: _volumeid,
                Library: _action
              }
        }).pipe();
    }

    SaveInTransRestore(rowEl:any) {
        const http = this.httpClient;
        const url = this.AppUrl + "VNas/TransRestore";
        return http.post(url,rowEl).pipe();
    }

    FAQFolderList() {
        const http = this.httpClient;
        const url = this.AppUrl + "Shared/FAQFolderList";
        return http.get(url);
    } 
    ChangeLogFolderList() {
        const http = this.httpClient;
        const url = this.AppUrl + "Shared/ChangeLogFolderList";
        return http.get(url);
    }
    public getHTML(_jsonURL,foldername) {
        
        const http = this.httpClient;
      // var htmlFile='';
       // http.get('./'+_jsonURL+'.html').map(response => response).subscribe(html => htmlFile = html);
        _jsonURL=this.AppUrl+"FAQ/"+foldername+"/"+_jsonURL+".html";
        return http.get(_jsonURL, {responseType: 'blob'}).pipe();
        //return http.get(_jsonURL);
      }

}