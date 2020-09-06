import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class StatusService {
  constructor(public httpClient: HttpClient, @Inject('BASE_URL') public AppUrl: string) {

  }

  CurrentStatus() {
    const http = this.httpClient;
    const url = 'Shared/CurrentStatus';
    return http.get(url).pipe();
  }

  GetDeleteMediaFromProcess(OnAirStatus, user, device, date) {
    return this.httpClient.get(this.AppUrl + 'Status/GetDeleteMediaFromProcess', {
      params: {
        OnAirStatus: OnAirStatus,
        user: user ? user : '@',
        device: device ? device : '@',
        date: date ? date.replace(' - ', '@') : '@'
      }
    }).pipe()
  };
  deleteFromProcess(data: any) {
    const http = this.httpClient;
    const url = 'Shared/DeletePendingProcess';
    return http.get(url, {
      params: {
        UID: data
      }
    }).pipe();
  }
  saveAssigned(clipid: string, remarks: any, status: string) {
    const http = this.httpClient;
    const url = 'Status/saveassigned';
    return http.get(url, {
      params: {
        Clipid: clipid,
        Remarks: remarks,
        Status: status
      }
    }).pipe();
  }
  recreateproxy(clipid: string, ext: any, timecode: string) {
    const http = this.httpClient;
    const url = 'Status/recreateproxy';
    return http.get(url, {
      params: {
        Clipid: clipid,
        Ext: ext,
        TimeCode: timecode
      }
    }).pipe();
  }

  saveAssignedNew(clipid: string, remarks: any, status: string) {
    const http = this.httpClient;
    const url = 'Status/saveassigned';
    return http.get(url, {
      params: {
        Clipid: clipid,
        Remarks: remarks["Remarks"],
        slot: remarks["slot"],
        range: remarks["range"],
        Status: status
      }
    }).pipe();
  }
  GetPP_ChartData() {
    const http = this.httpClient;
    const url = 'Status/GetPP_ChartData';
    return http.get(url).pipe();
  }
  GetDeviceSpace(deviceid:any) {
    const http = this.httpClient;
    const url = 'Status/GetDeviceSpace';
    return http.get(url,{
      params: {
        DeviceUID: deviceid,
      }
    }).pipe();
  }
  GetDeviceSpaceByApi(deviceid:any) {
    const http = this.httpClient;
    const url = 'Status/GetDeviceSpaceByApi';
    return http.get(url,{
      params: {
        DeviceUID: deviceid,
      }
    }).pipe();
  }
  GetPending_ChartData() {
    const http = this.httpClient;
    const url = 'Status/GetPending_ChartData';
    return http.get(url).pipe();
  }
  GetOperationID() {
    const http = this.httpClient;
    const url = 'Status/GetOperationID';
    return http.get(url).pipe();
  }

  DeleteFromProcessDelete(pdUID) {
    return this.httpClient.get(this.AppUrl + 'Status/DeleteFromProcessDelete', {
      params: {
        pdUID: pdUID
      }
    }).pipe()
  }
  GetTotalLogsData(o) {
    return this.httpClient.get(this.AppUrl + 'Status/GetTotalLogsData', {
      params: {
        OperationUID: o.OperationUID ? o.OperationUID : "@",
        DateRange: o.DateRange ? o.DateRange.replace(' - ', '@') : '@',
        SourceUID: o.SourceUID ? o.SourceUID : "@",
        DestinationUID: o.DestinationUID ? o.DestinationUID : "@",
        user: o.user ? o.user : "@"
      }
    }).pipe();

  }

  ResetOperation(pUID) {
    return this.httpClient.get(this.AppUrl + 'Status/ResetOperation', {
      params: {
        pUID: pUID
      }
    }).pipe()
  }

  BulkRemoveFromMedia(qcVal) {
    var formData = new FormData();
    formData.append("pdUIDs", qcVal);
    return this.httpClient.post(this.AppUrl + 'Status/BulkRemoveFromMedia', formData).pipe();
  }
  BulkReset(qcVal) {
    var formData = new FormData();
    formData.append("pdUIDs", qcVal);
    return this.httpClient.post(this.AppUrl + 'Status/BulkReset', formData).pipe();
  }

  GetUserOperations() {
    return this.httpClient.get(this.AppUrl + 'Status/GetUserOperations').pipe();
  }

  GetUserOperationsLogs(user, operation, date) {
    return this.httpClient.get(this.AppUrl + 'Status/GetUserOperationsLogs', {
      params: {
        user: user ? user : '@',
        operation: operation ? operation : '@',
        date: date ? date.replace(' - ', '@') : '@'
      }
    })
  }


  updatePriority(uid: any, priority: any) {
    const http = this.httpClient;
    const url = 'Shared/UpdatePriority';
    return http.get(url, {
      params: {
        UID: uid,
        Priority: priority
      }
    }).pipe();
  }

  bulkupdatePriority(seletedIDs: any, priority: any) {
    const http = this.httpClient;
    const url = this.AppUrl + 'Shared/BulkUpdatePriority';

    var oprData: any = {};
    oprData.seletedID = seletedIDs;


    oprData.Prio = priority;

    return http.post(url, oprData).pipe();
  }

  BulkDeleteProcessEntry(seletedIDs: any) {
    const http = this.httpClient;
    const url = this.AppUrl + 'Shared/BulkDeleteProcessEntry';

    var oprData: any = {};
    oprData.seletedID = seletedIDs;
    return http.post(url, oprData).pipe();
  }

  resetID(seletedIDs: any) {
    const http = this.httpClient;
    const url = this.AppUrl + 'Shared/ResetID';

    var oprData: any = {};
    oprData.seletedID = seletedIDs;
    return http.post(url, oprData).pipe();
  }


  GetAlertChannelsList(channeluid: any) {
    const http = this.httpClient;
    const url = 'Status/GetChannels_Alert';
    return http.get(url, {
      params: {
        ChannelID: channeluid,
      }
    }).pipe();
  }
}
