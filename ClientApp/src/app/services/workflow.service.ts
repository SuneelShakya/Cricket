import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class WorkflowService {
  constructor(
    public httpClient: HttpClient,
    @Inject('BASE_URL') public AppUrl: string
  ) {}

  Workflow() {
    const http = this.httpClient;
    const url = 'Shared/Workflow';
    return http.get(url).pipe();
  }

  Devices() {
    const http = this.httpClient;
    const url = 'Shared/Devices';
    return http.get(url).pipe();
  }

  TCProfile() {
    const http = this.httpClient;
    const url = 'Shared/Profiles';
    return http.get(url).pipe();
  }

  AddFolder(folderName: any) {
    const http = this.httpClient;
    const url = 'Shared/AddFolder';
    return http.get(url, { params: { FolderName: folderName } }).pipe();
  }

  AddWorkFlow(data: any) {
    // AddWorkflowRulesListForm
    const http = this.httpClient;
    const url = 'Shared/AddWorkflowRulesListForm';
    return http.post(url, data).pipe();
  }

  updateWorkflow(data,uid) {
    const http = this.httpClient;
    const url = 'Shared/UpdateWorkflowRulesListForm';
    return http
      .post(url,  data,{
        params:{
          uid:uid
        }
      })
      .pipe();
  }

  UpdateWorkflowStatus(status: any, uid: any) {
    const http = this.httpClient;
    const url = 'Shared/UpdateStatusWorkflowListform';
    return http
      .get(url, {
        params: {
          Status: status,
          UID: uid
        }
      })
      .pipe();
  }

  DeleteWorkflow(uid: any) {
    const http = this.httpClient;
    const url = 'Shared/DeleteWorkflowListForm';
    return http
      .get(url, {
        params: {
          UID: uid
        }
      })
      .pipe();
  }

  DeleteFolder(uid: any) {
    const http = this.httpClient;
    const url = 'Shared/DeleteFolder';
    return http
      .get(url, {
        params: {
          UID: uid
        }
      })
      .pipe();
  }
}
