import { Component, OnInit } from '@angular/core';
import { GenericService } from '../services/Generic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import * as $ from 'jquery';
import { R3TargetBinder, IfStmt } from '@angular/compiler';
import { Router } from '@angular/router';
@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']

})
export class WorkflowComponent implements OnInit {
  EditIndex = "-1";
  objCls: WorflowProperties = new WorflowProperties();
  Component = "";
  Profile = "";
  Sequence = "";
  Folder = "";
  PartialActive = "";
  componentdata: any = [];
  detaildata: any = [];
  popup: any = "";
  BtnText: any = "";
  inspectordata: any;
  datacomponent: any;
  flowdata: any;
  profiledata: any = [];
  EditMainIndex: any;
  deleteuid: any;
  isLoading: boolean;
  OsTypeForComponennt: any;
  deleteuidPartial: any;
  sortedData: any;
  isdisable: any = false;
  Sequencedata: any = [];
  UniqueArray: any = [];
  onsuccess: any;
  onfail: any;
  searchText: any;
  selectarray: any = [];
  dynamicarray: any;
  status: any;
  sendinspdata: string;
  outputpath: any;
  failmovepath: any;
  successmovepath: any;
  onfailfileaction: any;
  onsuccessfileaction: any;
  failrename: any;
  successrename: any;
  failrenamehide: boolean = true;
  successrenamehide: boolean = true;
  failpathhide: boolean = true;
  successpathhide: boolean = true;
  constructor(
    public objService: GenericService, private _snackBar: MatSnackBar, public router: Router) { }
  ngOnInit() {
    var user = localStorage.getItem('user')
    if (user == "" || user == undefined || user == null) {
      this.router.navigateByUrl('/counter');

    }
    else {
      this.router.navigateByUrl('/Flow-data');

    }
    this.GetComponent();
    this.GetInspector();
    this.GetProfiledata();
    this.fetchflowdatadata();
  };
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  onInpectorChange(obj) {
    let index1 = this.inspectordata.findIndex((record: any) => record.UID == obj.value);
    this.OsTypeForComponennt = this.inspectordata[index1].OSType;
    this.Component = "";
  }

  Refresh(i: any) {
    this.flowdata[i].inspectorname;
    let ind = this.inspectordata.findIndex((record: any) => record.Name == this.flowdata[i].inspectorname);
    this.sendinspdata = this.inspectordata[ind].SystemIP + "$" + this.inspectordata[ind].PortRx;
    this.objService.checkinspectorstatus(this.sendinspdata).subscribe((datas: any) => {
      if (datas.result.length > 0) {
        this.status = datas.result;
        if (this.status == "false" || this.status == "Cannot Communicate with Core") {
          // this.status = 0;
          // this.version = "";
          this.openSnackBar("No Inspector Found", "Failed")
        }
        else {
          // this.status = 1;     
          this.openSnackBar("Refresh Successfull", "Success")

        }
      };




    });
  }

  sortData(sort: Sort) {
    const data = this.flowdata.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Sno': return this.compare(a.Sno, b.Sno, isAsc);
        case 'Name': return this.compare(a.Name, b.Name, isAsc);
        case 'inspectorname': return this.compare(a.inspectorname, b.inspectorname, isAsc);
        case 'SystemIP': return this.compare(a.SystemIP, b.SystemIP, isAsc);
        case 'SystemName': return this.compare(a.SystemName, b.SystemName, isAsc);
        case 'Version': return this.compare(a.Version, b.Version, isAsc);
        case 'status': return this.compare(a.status, b.status, isAsc);
        case 'Date': return this.compare(a.Date, b.Date, isAsc);
        case 'IsActive': return this.compare(a.IsActive, b.IsActive, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  Reset() {
    this.CancelEditPartial();
    this.detaildata = [];
    this.objCls = new WorflowProperties();
    this.popup = "";
    this.BtnText = "";
    this.fetchflowdatadata();
  }
  GetProfiledata() {
    this.objService.fetchprofiledata('x', 'x', 'x').subscribe((datas: any) => {
      if (datas.ResultData.length > 0)
        this.profiledata = datas.ResultData;
    });
  }
  GetInspector() {
    this.objService.fetchinspectordata().subscribe((datas: any) => {
      if (datas.ResultData.length > 0) {
        this.inspectordata = datas.ResultData
      }
    });
  }
  GetComponent() {
    this.objService.fetchComponentdata().subscribe((datas: any) => {
      if (datas.ResultData.length > 0) {
        this.datacomponent = datas.ResultData
      }
    });
  }
  AddPartial() {
    let ind = this.detaildata.findIndex((record: any) => record.Component == this.Component && record.Profile == this.Profile && record.Sequence == this.Sequence && record.Folder == this.Folder);
    if (ind == -1) {
      let index = this.datacomponent.findIndex((record: any) => record.UID == this.Component);
      let index1 = this.profiledata.findIndex((record: any) => record.UID == this.Profile);
      this.detaildata.push(
        {
          Component: this.Component,
          Profile: this.Profile,
          Sequence: this.Sequence,
          Folder: this.Folder,
          outputpath: this.outputpath,
          PartialActive: this.PartialActive,
          ComponentName: this.datacomponent[index].name,
          ProfileName: this.profiledata[index1].Name,
          OnFail: this.onfail,
          OnSuccess: this.onsuccess,
          OnFailPath: this.failmovepath,
          OnSuccessPath: this.successmovepath,
          OnFailFileAction: this.onfailfileaction,
          OnSuccessFileAction: this.onsuccessfileaction,
          FailRename: this.failrename,
          SuccessRename: this.successrename,

        }
      )
      if (this.onfailfileaction == "Rename") {
        this.failrenamehide = false
      }
      else {
        this.failrenamehide = true
      }
      if (this.onsuccessfileaction == "Rename") {
        this.successrenamehide = false
      }
      else {
        this.successrenamehide = true
      }
      if (this.onfailfileaction == "Move") {
        this.failpathhide = false
      }
      else {
        this.failpathhide = true
      }
      if (this.onsuccessfileaction == "Move") {
        this.successpathhide = false
      }
      else {
        this.successpathhide = true
      }
      this.CancelEditPartial();
    }
    else {
      this.openSnackBar("Record already exists!!", "Warning");
      return;
    }
  }
  UpdatePartial() {
    let ind = -1//this.detaildata.findIndex((record: any) => record.Component == this.Component && record.Profile == this.Profile && record.Sequence == this.Sequence && record.Folder == this.Folder);
    if (ind == 1) {
      this.openSnackBar("Record already exists!!", "Warning");
      return;
    }
    else {
      if (ind == -1) {
        this.ArrayRowRefresh(parseInt(this.EditIndex));
        let index1 = this.profiledata.findIndex((record: any) => record.UID == this.Profile);
        let index = this.datacomponent.findIndex((record: any) => record.UID == this.Component);
        this.detaildata[parseInt(this.EditIndex)].Component = this.Component;
        this.detaildata[parseInt(this.EditIndex)].ComponentName = this.datacomponent[index].name;
        this.detaildata[parseInt(this.EditIndex)].Profile = this.Profile;
        this.detaildata[parseInt(this.EditIndex)].ProfileName = this.profiledata[index1].Name;
        this.detaildata[parseInt(this.EditIndex)].Sequence = this.Sequence;
        this.detaildata[parseInt(this.EditIndex)].Folder = this.Folder;
        this.detaildata[parseInt(this.EditIndex)].outputpath = this.outputpath;
        this.detaildata[parseInt(this.EditIndex)].PartialActive = this.PartialActive;
        this.detaildata[parseInt(this.EditIndex)].OnFail = this.onfail;
        this.detaildata[parseInt(this.EditIndex)].OnSuccess = this.onsuccess;
        this.detaildata[parseInt(this.EditIndex)].OnFail = this.onfail;
        this.detaildata[parseInt(this.EditIndex)].OnFailPath = this.failmovepath;
        this.detaildata[parseInt(this.EditIndex)].OnSuccessPath = this.successmovepath;
        this.detaildata[parseInt(this.EditIndex)].OnFailFileAction = this.onfailfileaction;
        this.detaildata[parseInt(this.EditIndex)].OnSuccessFileAction = this.onsuccessfileaction;
        this.detaildata[parseInt(this.EditIndex)].FailRename = this.failrename;
        this.detaildata[parseInt(this.EditIndex)].SuccessRename = this.successrename;
        if (this.onfailfileaction == "Rename") {
          this.failrenamehide = false
        }
        else {
          this.failrenamehide = true
        }
        if (this.onsuccessfileaction == "Rename") {
          this.successrenamehide = false
        }
        else {
          this.successrenamehide = true
        }
        if (this.onfailfileaction == "Move") {
          this.failpathhide = false
        }
        else {
          this.failpathhide = true
        }
        if (this.onsuccessfileaction == "Move") {
          this.successpathhide = false
        }
        else {
          this.successpathhide = true
        }
        this.CancelEditPartial();
      }
    }
  }

  DeletePartial(i) {
    this.deleteuidPartial = i;
    var modal = document.getElementById("deletePartialModal");
    modal.style.display = "block";
  }
  HideDeletePartial() {
    var modal = document.getElementById("deletePartialModal");
    modal.style.display = "none";
  }
  ActualDeletePartial() {
    this.detaildata.splice(parseInt(this.deleteuidPartial), 1);
    this.HideDeletePartial();
  }
  EmptySuccessField() {
    if (this.onsuccessfileaction == "Move") {
      this.successrename = "";
    }
    else if (this.onsuccessfileaction == "Rename") {
      this.successmovepath = "";
    }
    else {
      this.successrename = "";
      this.successmovepath = "";
    }
  }

  ArrayRowRefresh(EditIndex:any) {
    this.detaildata[parseInt(EditIndex)].OnFailPath = "";
    this.detaildata[parseInt(EditIndex)].OnSuccessPath = "";
    this.detaildata[parseInt(EditIndex)].OnFailFileAction = "";
    this.detaildata[parseInt(EditIndex)].OnSuccessFileAction = "";
    this.detaildata[parseInt(EditIndex)].FailRename = "";
    this.detaildata[parseInt(EditIndex)].SuccessRename = "";
  }

  EmptyFailField() {
    if (this.onfailfileaction == "Move") {
      this.failrename = "";
    }
    else if (this.onfailfileaction == "Rename") {
      this.failmovepath = "";
    }
    else {
      this.failrename = "";
      this.failmovepath = "";
    }
  }


  CancelEditPartial() {
    this.Component = "";
    this.Profile = "";
    this.Sequence = "";
    this.Folder = "";
    this.outputpath = "";
    this.PartialActive = "";
    this.onfail = "";
    this.onsuccess = "";
    this.onfailfileaction = "";
    this.onsuccessfileaction = "";
    this.successrename = "";
    this.failrename = "";
    this.failmovepath = "";
    this.failrename = "";
    this.successmovepath = "";
    this.successrename = "";
    this.EditIndex = "-1";
    // this.UniqueArray=[];
  }
  EditPartial(obj, i) {
    this.selectarray = [];
    this.EditIndex = i;
    this.Component = obj.Component;
    this.Profile = obj.Profile;
    this.Sequence = obj.Sequence;
    this.Folder = obj.Folder;
    this.outputpath = obj.outputpath;

    this.PartialActive = obj.PartialActive;
    this.onfail = obj.OnFail
    this.onsuccess = obj.OnSuccess
    this.onsuccessfileaction = obj.OnSuccessFileAction;
    this.onfailfileaction = obj.OnFailFileAction;
    this.failmovepath = obj.OnFailPath
    this.successmovepath = obj.OnSuccessPath
    this.failrename = obj.FailRename
    this.successrename = obj.SuccessRename

  }

  fetchflowdatadata() {
    this.objService.fetchflowdata().subscribe((datas: any) => {
      //var x = JSON.parse(datas);
      if (datas.ResultData.length > 0)
        this.flowdata = datas.ResultData;
      this.sortedData = this.flowdata;
    });
  }
  Editmain(obj, i) {
    this.isdisable = false;
    this.selectarray = [];
    this.EditMainIndex = i;
    this.objCls.UID = obj.UID;
    this.objCls.Name = obj.Name;
    this.objCls.SystemIP = obj.SystemIP;
    this.objCls.Version = obj.Version;
    this.objCls.Inspector = obj.InspectorUID;
    let inx = this.inspectordata.findIndex((record: any) => record.UID == obj.InspectorUID);
    this.OsTypeForComponennt = this.inspectordata[inx].OSType;
    this.objCls.SystemName = obj.SystemName;
    this.objCls.Status = (obj.status == true) ? "1" : "0";
    this.objCls.IsActive = obj.IsActive;
    this.popup = "Edit";
    this.BtnText = "Update";
    this.openDialog('open');
    this.objService.fetchflowdetails(obj.UID).subscribe((datas: any) => {
      //var x = JSON.parse(datas);
      if (datas.ResultData.length > 0) {
        var x = datas.ResultData;
        for (let ind = 0; ind < x.length; ind++) {
          let index = this.datacomponent.findIndex((record: any) => record.UID == x[ind].Component);
          let index1 = this.profiledata.findIndex((record: any) => record.UID == x[ind].Profile);
          this.detaildata.push(
            {
              Component: x[ind].Component,
              Profile: x[ind].Profile.toString(),
              Sequence: x[ind].Sequence,
              Folder: x[ind].inputpath,
              outputpath: x[ind].outputpath,
              PartialActive: (x[ind].PartialActive == true) ? 1 : 0,
              ComponentName: this.datacomponent[index].name,
              ProfileName: this.profiledata[index1].Name,
              OnFail: x[ind].OnFail,
              OnSuccess: x[ind].OnSuccess,
              OnFailPath: x[ind].OnFail_MovePath,
              OnSuccessPath: x[ind].OnSuccess_MovePath,
              OnFailFileAction: x[ind].OnFail_FileAction,
              OnSuccessFileAction: x[ind].OnSuccess_FileAction,
              FailRename: x[ind].OnFail_Rename,
              SuccessRename: x[ind].OnSuccess_Rename,

            }
          )
          if (x[ind].OnFail_FileAction == "Rename") {
            this.failrenamehide = false
          }
          else {
            this.failrenamehide = true
          }
          if (x[ind].OnSuccess_FileAction == "Rename") {
            this.successrenamehide = false
          }
          else {
            this.successrenamehide = true
          }
          if (x[ind].OnFail_FileAction == "Move") {
            this.failpathhide = false
          }
          else {
            this.successpathhide = true
          }
          if (x[ind].OnSuccess_FileAction == "Move") {
            this.failpathhide = false
          }
          else {
            this.successpathhide = true
          }

        }

        this.CancelEditPartial();

      }
    });

  }
  onchange(val, event) {
    if (event.target.id == "fail") {
      this.detaildata[val].OnFail = event.currentTarget.selectedOptions[val].value;
    }
    else {
      this.detaildata[val].OnSuccess = event.currentTarget.selectedOptions[val].value;
    }
  }
  saveFlow() {
    this.isLoading = true;
    let index = this.inspectordata.findIndex((record: any) => record.UID == this.objCls.Inspector);
    this.objCls.Status = "1";
    this.objCls.SystemIP = this.inspectordata[index].SystemIP;
    this.objCls.Version = this.inspectordata[index].Version;
    this.objCls.SystemName = this.inspectordata[index].SystemName;
    this.objCls.OperationName = this.BtnText;
    this.objCls.ComponentArray = this.detaildata;
    this.objService.Insertflowdata(this.objCls).subscribe((datas: any) => {
      if (datas.toLowerCase() == "success") {
        this.openSnackBar("New workflow " + this.objCls.OperationName + " successfully", "Success");
        this.Reset();
        this.openDialog("close");
        this.isLoading = false;
      }
      else if (datas.toLowerCase() == "fail") {
        this.openSnackBar("New workflow not " + this.objCls.OperationName + "", "Warning");
        this.isLoading = false;
      }

    });
  }
  deleteFlow() {
    this.isLoading = true;
    this.objCls.OperationName = "Delete";
    this.objCls.UID = this.deleteuid;
    this.objCls.ComponentArray = [];
    this.objService.Insertflowdata(this.objCls).subscribe((datas: any) => {
      if (datas.toLowerCase() == "success") {
        this.openSnackBar("Workflow Deleted successfully", "Success");
        this.Reset();
        //this.openDialog("close");
        this.HideDialog();
        this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/Flow-data']);
        });
        this.isLoading = false;
      }
      else if (datas.toLowerCase() == "fail") {
        this.openSnackBar("Workflow not deleted due to system error", "Error");
        this.isLoading = false;
      }
    });
  }
  AddNew(val) {
    this.isdisable = true;
    this.objCls = new WorflowProperties();
    this.popup = "Create New";
    this.BtnText = "Save";
    this.openDialog(val);
  }

  openDialog(val) {
    var modal = document.getElementById("entryModal");
    modal.style.display = val == 'open' ? "block" : "none";
    if (val == "close") {
      this.detaildata = [];
      this.Sequencedata = [];
      this.dynamicarray = [];
      this.UniqueArray = [];
    }
  }
  Deletemain(val) {
    var modal = document.getElementById("deleteModal");
    modal.style.display = "block";
    this.deleteuid = val;
  }
  HideDialog() {
    var modal = document.getElementById("deleteModal");
    modal.style.display = "none";
  }
}

class WorflowProperties {
  UID: any = "0";
  Name: any = "";
  IsActive: any = "";
  Status: any = "";
  Inspector: any = "";
  SystemIP: any = "";
  SystemName: any = "";
  Version: any = "";
  ComponentArray: any = [];
  OperationName: any = "";
}