import { Component, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../services/Generic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogData } from '../home/home.component';
import { FormBuilder } from '@angular/forms';
import { reference } from '@angular/core/src/render3';
import { Sort } from '@angular/material/sort';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgStyle } from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-Transaction-data',
  templateUrl: './Transaction-data.component.html',
  styleUrls: ['./Transaction-data.component.css']

})
export class TransactionDataComponent {
  public forecasts: WeatherForecast[];
  componentdata: any;
  name: any;
  animal: any;
  EditIndex: any;
  Response: any;
  searchText: any;
  isLoading: boolean;
  timezone: any;
  timeoffset: any;
  sortedData: any;
  length = 100;
  pageSize = 10;
  pageSizeOptions: any = [5, 10, 25, 100];
  dataSource: MatTableDataSource<unknown>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  curPage: number;
  fontfamily: any;

  constructor(
    public objService: GenericService,@Inject(DOCUMENT) private document, public dialog: MatDialog, private _snackBar: MatSnackBar, public router: Router) { }

  ngOnInit() {
    var user = localStorage.getItem('user')
    if(user=="" || user==undefined ||user==null){
      this.router.navigateByUrl('/counter');

    }
    else{
      this.router.navigateByUrl('/Transaction-data');

    }
  
    this.fetchtransactiondata();
  };
  fetchtransactiondata(event?: PageEvent) {
    this.isLoading = true;
    // this.pageSize=event.pageSize;
    // this.curPage = event.pageIndex;
    if (event) {
      this.pageSize = event.pageSize;
      this.curPage = event.pageIndex + 1;
    } else {
      this.paginator.pageIndex = 0;
      this.curPage = 1;
    }
    this.objService.fetchtransactiondata(this.pageSize, this.curPage, this.searchText).subscribe((datas: any) => {
      if (datas.ResultData.length > 0) {
        this.componentdata = datas.ResultData;
        this.sortedData = this.componentdata;
        this.length = this.componentdata[0].tlength;
        this.dataSource = new MatTableDataSource(this.sortedData);
      }
      this.isLoading = false;

    });
  }

  

  ResetJob(status:any,UID:any){
    this.objService.ResetTransaction(status,UID).subscribe((datas: any) => {
      
        this.isLoading = false;
      this.openSnackBar('Job status have changed "' + status + '"', 'successfully')
    
        this.fetchtransactiondata();
      
    });
  }

  Singlepriorityupdate(priority: any, jobid: any) {
    var _objpriority = priority == 0 ? 'Low' : priority == 1 ? 'Normal' : priority == 2 ? 'Moderate' : priority == 3 ? 'High' : priority == 4 ? 'Highest' : '';
    this.objService.Singlepriorityupdate(priority, jobid).subscribe(
      datass => {
        this.isLoading = false;
        this.openSnackBar('Priorty have changed "' + _objpriority + '"', 'successfully');
        
        });
        this.fetchtransactiondata();
        this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/Transaction-data']);
        });

      }
    
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  SetTimeZone() {
    // this.fetchtransactiondata();
    this.timezone = this.timeoffset;
    // alert(this.timezone);
  }





  sortData(sort: Sort) {
    const data = this.componentdata.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Sno': return this.compare(a.Sno, b.Sno, isAsc);
        case 'Inspector': return this.compare(a.Inspector, b.Inspector, isAsc);
        case 'Component': return this.compare(a.component, b.component, isAsc);
        case 'Clip': return this.compare(a.Clip, b.Clip, isAsc);
        case 'Jobstatus': return this.compare(a.Jobstatus, b.Jobstatus, isAsc);
        case 'JobStarttime': return this.compare(a.JobStarttime, b.JobStarttime, isAsc);
        case 'JobEndtime': return this.compare(a.JobEndtime, b.JobEndtime, isAsc);
        case 'Directory': return this.compare(a.Directory, b.Directory, isAsc);
        case 'Progress': return this.compare(a.Progress, b.Progress, isAsc);
        case 'Remark': return this.compare(a.Remark, b.Remark, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }





  setPageSizeOptions(setPageSizeOptionsInput: string) {

    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }




  clone(val: any) {
    // this.componentdata[val].shift();
    this.componentdata.splice(val + 1, 0, { UID: "nouid", name: this.componentdata[val].name, binaryname: this.componentdata[val].binaryname, path: this.componentdata[val].path, Type: this.componentdata[val].Type, OSType: this.componentdata[val].OSType, IsActive: this.componentdata[val].IsActive, version: this.componentdata[val].version, status: this.componentdata[val].status, Reference: this.componentdata[val].Reference })
  }




  openDialog(index: any, data): void {
    const dialogRef = this.dialog.open(Transactiondialog, {
      // width: '50vw',
      height: '450px',
      data: { index: index, Name: this.componentdata, status: data }
    });

  }

  openeditDialog(index: any, data): void {
    const dialogRef = this.dialog.open(Transactioneditdialog, {
      // width: '50vw',
      // height:'30vh',
      data: { index: index, Name: this.componentdata, status: data }
    });

  }



  opendeleteDialog(data: any): void {
    const dialogRef = this.dialog.open(Transactiondeletedialog, {
      width: '400px',
      height: '150px',
      data: { index: data, Name: this.componentdata }
    });

  }

}

@Component({
  selector: 'dialog-overview-component-dialog',
  templateUrl: 'Transaction-dialog.component.html',
})
export class Transactiondialog {

  username: any = "";
  password: any = "";
  Port: any = "";
  dbinfo: any = [];
  IP: any;
  Response: any;
  splitdata: any;
  DBname: any;
  MAMDBuser: any;
  DBCheck: any;
  MAMDBpassword: any;
  componentname: any;
  Binaryname: any;
  nameparameter: any;
  argvalue: any;
  detail: any;
  TXport: any;
  Comments: any;
  tags: any;
  inspectordata: any = [];
  DBCreate: any;
  version: any;
  status: number;
  componentdata: any = [];
  ArgArray: any = [];
  path: string;
  type: string;
  Reference: string;
  editstatus: any;
  ArgtableArray: any = [];
  update: string;
  componentArray: any = [];
  UID: any = [];
  deleteindex: any;
  OSType: any;
  EDStatus: any;
  constructor(
    public dialogRef: MatDialogRef<Transactiondialog>, private _formBuilder: FormBuilder, public objService: GenericService, private _snackBar: MatSnackBar, public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
    if (this.data.status == "edit") {
      this.update = this.data.status
      this.edit();
    }
  };
  Prerequisites: any = [];
  onNoClick(): void {
    this.dialogRef.close();
  }






  Inserttransactiondata() {
    this.componentArray.push({ Name: this.componentname, BinaryName: this.Binaryname, Path: this.path, Type: this.type, OSType: this.OSType, EDStatus: this.EDStatus, version: this.version, Status: this.status, Reference: this.Reference });
    this.objService.Inserttransactiondata(this.componentArray).subscribe((datas: any) => {
      if (datas.result.length > 0) {
        this.componentdata = JSON.parse(datas.result)
        this.componentdata = this.componentdata.ResultData;

      }
      this.dialogRef.close();
      this.openSnackBar("Component Data Inserted", "Success")
      this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/Component-data']);
      });
      this.componentArray = [];
    });
  }



  EditComponent() {
    this.componentArray.push({ Name: this.componentname, BinaryName: this.Binaryname, Path: this.path, Type: this.type, OSType: this.OSType, EDStatus: this.EDStatus, version: this.version, Status: this.status, Reference: this.Reference, UID: this.data.Name[this.data.index].UID });
    this.objService.updatecomponentdata(this.componentArray).subscribe((datas: any) => {
      if (datas.result.length > 0) {
        this.dialogRef.close();
        this.openSnackBar("Component Data Updated", "Success")
        this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/Component-data']);
        });
      }
      else {
        this.openSnackBar("Component Update Failed", "Unsuccessfull")

      }


      this.componentArray = [];
    });
  }









  deletecomponentdata() {
    //  this.inspectordata.push({InspectorIp:this.SystemIP,InspectorPort:this.Recieveport});


    this.objService.deletecomponent(this.deleteindex).subscribe((datas: any) => {
      if (datas.result.length > 0) {
        this.Response = datas.result;
        this.Response = this.Response
        // this.openSnackBar("Inspector Created","Successfully");


      }


    });
  }



  editrow(val) {
    let index = this.ArgArray.findIndex((record: any) => record.UID == this.ArgArray[val].Component);

    this.nameparameter = this.ArgArray[val].NameParameter
    this.argvalue = this.ArgArray[val].ArgumentValue
    this.detail = this.ArgArray[val].Detail
    this.ArgArray.splice(val, 1);

  }

  edit() {


    this.componentname = this.data.Name[this.data.index].name;
    this.Binaryname = this.data.Name[this.data.index].binaryname;
    this.path = this.data.Name[this.data.index].path;
    this.type = this.data.Name[this.data.index].Type;
    this.OSType = this.data.Name[this.data.index].OSType;
    this.EDStatus = this.data.Name[this.data.index].IsActive;
    this.version = this.data.Name[this.data.index].version;
    this.status = this.data.Name[this.data.index].status.toString();
    this.Reference = this.data.Name[this.data.index].ref;




  }






  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}




@Component({
  selector: 'dialog-overview-component-dialog',
  templateUrl: 'Transactiondelete-dialog.component.html',
})
export class Transactiondeletedialog {
  Response: any;
  constructor(
    public dialogRef: MatDialogRef<Transactiondeletedialog>, private _formBuilder: FormBuilder, public objService: GenericService, private _snackBar: MatSnackBar, public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {

  };
  Prerequisites: any = [];
  onNoClick(): void {
    this.dialogRef.close();
  }

  deletecomponentdata() {
    //  this.inspectordata.push({InspectorIp:this.SystemIP,InspectorPort:this.Recieveport});


    this.objService.deletecomponentdata(this.data.Name[this.data.index].UID).subscribe((datas: any) => {
      if (datas.length > 0) {
        this.Response = datas;
        this.Response = this.Response;
        if (this.Response == "0") {
          this.openSnackBar("Component Deleted", "Successfully");
        }
        else {
          this.openSnackBar(this.Response, "Failed");

        }
        this.dialogRef.close();
        this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/Component-data']);
        });

      }


    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

@Component({
  selector: 'dialog-overview-component-dialog',
  templateUrl: 'Transactionedit-dialog.component.html',
})
export class Transactioneditdialog {
  Response: any;
  flowdata: any;
  searchText: any;
  constructor(
    public dialogRef: MatDialogRef<Transactioneditdialog>, private _formBuilder: FormBuilder, public objService: GenericService, private _snackBar: MatSnackBar, public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
    this.fetchflowdatadata();
  };
  Prerequisites: any = [];
  onNoClick(): void {
    this.dialogRef.close();
  }

  fetchflowdatadata() {
    this.objService.fetchflowdata().subscribe((datas: any) => {
      //var x = JSON.parse(datas);
      if (datas.ResultData.length > 0)
        this.flowdata = datas.ResultData;
      this.searchText = this.data.Name[this.data.index].fname;
    });
  }
}
interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
