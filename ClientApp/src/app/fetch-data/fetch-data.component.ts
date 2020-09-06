import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../services/Generic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogData } from '../home/home.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import $ from "jquery";
import { Observable } from 'rxjs';
import { Sort } from '@angular/material/sort';


@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']

})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  inspectordata: any;
  name: any;
  animal: any;
  EditIndex: any;
  SystemIP: string;
  Recieveport: string;
  Inspectorname: string;
  Binaryname: string;
  TXport: string;
  version: any;
  status: number;
  Response: any;
  statusclass: any;
  flag:number=1;
  timehandle: any;
  sendinspdata: string;
  refreshdata: any=[];
  sortedData: any;
  isdisable: any;
  searchText:any;
  senddisabledata: any;

  constructor(
    public objService: GenericService, public dialog: MatDialog, private _snackBar: MatSnackBar, public router: Router) {
  }

  ngOnInit() {
    var user = localStorage.getItem('user')
    if(user=="" || user==undefined ||user==null){
      this.router.navigateByUrl('/counter');

    }
    else{
      this.router.navigateByUrl('/fetch-data');

    }
    this.fetchinspectordata();
    this.timehandle = setInterval(() => {
      this.fetchinspectordata();
  
  
    }, 60000);

  };
 
  
  sortData(sort: Sort) {
    const data = this.inspectordata.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Sno': return this.compare(a.Sno, b.Sno, isAsc);
        case 'Name': return this.compare(a.Name, b.Name, isAsc);
        case 'BinaryName': return this.compare(a.BinaryName, b.BinaryName, isAsc);
        case 'SystemIP': return this.compare(a.SystemIP, b.SystemIP, isAsc);
        case 'PortRx': return this.compare(a.PortRx, b.PortRx, isAsc);
        case 'PortTx': return this.compare(a.PortTx, b.PortTx, isAsc);
        case 'Version': return this.compare(a.Version, b.Version, isAsc);
        case 'status': return this.compare(a.status, b.status, isAsc);
        case 'IsActive': return this.compare(a.IsActive, b.IsActive, isAsc);
        case 'OSType': return this.compare(a.OSType, b.OSType, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  fetchinspectordata() {
    this.objService.fetchinspectordata().subscribe((datas: any) => {
      if (datas.ResultData.length > 0) {
        this.inspectordata = datas.ResultData;
        this.refreshdata.push(this.inspectordata);
        this.sortedData = this.inspectordata;
      }
    });
  }

  clone(val: any) {
    this.inspectordata.splice(val + 1, 0, { UID: "nouid", Name: this.inspectordata[val].Name, BinaryName: this.inspectordata[val].BinaryName, SystemIP: this.inspectordata[val].SystemIP, PortRx: this.inspectordata[val].PortRx, PortTx: this.inspectordata[val].PortTx, status: this.inspectordata[val].status,IsActive:this.inspectordata[val].IsActive,OSType:this.inspectordata[val].OSType,Remark:this.inspectordata[val].Remark, Version: this.inspectordata[val].Version, LastScan: this.inspectordata[val].LastScan })
    this.openeditDialog(val+1)
  }


  Refresh(val:any){

    this.sendinspdata = this.refreshdata[0][val].SystemIP + "$" + this.refreshdata[0][val].PortRx;
    this.objService.checkinspectorstatus(this.sendinspdata).subscribe((datas: any) => {
      if (datas.result.length > 0) {
        this.version = datas.result;
        if (this.version == "false" || this.version == "Cannot Communicate with Core" ) {
          // this.status = 0;
          // this.version = "";
          this.openSnackBar("No Inspector Found","Failed")
        }
        else {
          // this.status = 1;     
          this.openSnackBar("Refresh Successfull","Success")

        }
    };

   
    
  
    });
};

openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 2000,
  });
}

DisableInspector(val:any){
  var x = this.inspectordata[val].IsActive=="Enable" ? 0:1;
  this.sendinspdata = this.inspectordata[val].SystemIP + "$" + this.inspectordata[val].PortRx + "$" + x;
  this.objService.DisableInspector(this.sendinspdata).subscribe((datas: any) => {
    if (datas.result.length > 0) {
      this.isdisable = datas.result;
      if(this.isdisable=="false" || this.isdisable=="Cannot Communicate with Core" ){
      this.openSnackBar("No Inspector Found","Failed")
        this.isdisable=this.inspectordata[val].IsActive;
      }
      else{
        this.openSnackBar("Inspector is "+this.isdisable,this.isdisable)
        this.updateisactive(val);

      }
  };



  });
  
};

updateisactive(val:any){
  this.senddisabledata = this.inspectordata[val].UID + "$" + this.isdisable;
  this.objService.updateisactive(this.senddisabledata).subscribe((datas: any) => {

  });
  this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/fetch-data']);
  });

}



  delete(val: any) {
    this.opendeleteDialog(val);
    // this.inspectordata.splice(val,1);

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(Fetchdialog, {
      // width: '50vw',
      // height: '450px',
      data: { name: this.name, animal: this.animal }
    });

  }

 

  Insertinspectordata() {
    //  this.inspectordata.push({InspectorIp:this.SystemIP,InspectorPort:this.Recieveport});
    this.inspectordata = "refresh$" + this.status;
    this.objService.updateinspectordata(this.inspectordata).subscribe((datas: any) => {
      if (datas.ResultData.length > 0) {
        this.Response = datas.ResultData;
        this.Response = this.Response

        //  this.fetch.fetchinspectordata();


        this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/fetch-data']);
        });



      }
    });
  }




  openeditDialog(data: any): void {
    const dialogRef = this.dialog.open(Fetcheditdialog, {
      // width: '50vw',
      // height: '400px',
      data: { index: data, Name: this.inspectordata }
    });

  }

  opendeleteDialog(data: any): void {
    const dialogRef = this.dialog.open(Fetchdeletedialog, {
      width: '400px',
      height: '150px',
      data: { index: data, Name: this.inspectordata }
    });

  }

}

@Component({
  selector: 'dialog-overview-fetch-dialog',
  templateUrl: 'fetch-dialog.component.html',
})
export class Fetchdialog {

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
  Inspectorname: any;
  Binaryname: any;
  Path: any;
  SystemIP: any;
  Recieveport: any;
  TXport: any;
  Comments: any;
  tags: any;
  inspectordata: any=[];
  DBCreate: any;
  version: any;
  status: number;
  timehandle: any;
  items = [];

  public options = {
    readonly: undefined,
    placeholder: '+ Tag'
  };
  form: FormGroup;
  IsActive: string;
  OSType: string;
  Remark: string;
  inspectdata: any=[];
  
  constructor(
    public dialogRef: MatDialogRef<Fetchdialog>, private _formBuilder: FormBuilder, public objService: GenericService, private _snackBar: MatSnackBar, public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.form = new FormBuilder().group({
      chips: [['chip'], []]
    });
  }
  ngOnInit() {
    // this.timehandle = setInterval(() => {
    //   this.checkinspectorstatus();


    // }, 5000);

  };
  Prerequisites: any = [];
  onNoClick(): void {
    this.dialogRef.close();
  }






  checkinspectorstatus() {
    //  this.inspectordata.push({InspectorIp:this.SystemIP,InspectorPort:this.Recieveport});
    this.inspectordata = this.SystemIP + "$" + this.Recieveport + "$" + this.Inspectorname + "$" + this.Binaryname + "$" + this.TXport;
    this.objService.checkinspectorstatus(this.inspectordata).subscribe((datas: any) => {
      if (datas.result.length > 0) {
        this.version = datas.result;
        if (this.version == "false") {
          this.status = 0;
          this.version = "";
          this.openSnackBar("Inspector Created", "Successfully");
          this.Insertinspectordata();

        }
        else if(this.version=="Cannot Communicate with Core"){
          this.version="";
          this.openSnackBar("Inspector Created", "Successfully");  
          this.Insertinspectordata();

        }
        else {
          this.status = 1;
          this.openSnackBar("Inspector Created", "Successfully");
          this.Insertinspectordata();

        }
        this.dialogRef.close()
        this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/fetch-data']);
        });
        //  this.dialogRef.close();
      }
      
    });
  }


  onAdding(tag) {
    this.items.push(tag)
  }

  public transform(value: string): Observable<object> {
    const item = { display: `@${value}`, value: `@${value}` };
    return Observable.throw(item);
  }

  Insertinspectordata() {
    //  this.inspectordata.push({InspectorIp:this.SystemIP,InspectorPort:this.Recieveport});
    
    
    this.inspectdata.push({inspector:this.Inspectorname,binary:this.Binaryname,systemip:this.SystemIP,rport:this.Recieveport,tport:this.TXport,status:this.status,active:this.IsActive,ostype:this.OSType,version:this.version,tags:this.items.toString()});
    this.objService.Insertinspectordata(this.inspectdata).subscribe((datas: any) => {
      if (datas.ResultData.length > 0) {
        this.Response = datas.ResultData;
        this.Response = this.Response

      }
      this.dialogRef.close();

      this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/fetch-data']);
        this.inspectdata=[];
      });
    });
    
  }









  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}


@Component({
  selector: 'dialog-overview-fetch-dialog',
  templateUrl: 'fetchedit-dialog.component.html',
})
export class Fetcheditdialog {

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
  Inspectorname: any;
  Binaryname: any;
  Path: any;
  SystemIP: any;
  Recieveport: any;
  TXport: any;
  Comments: any;
  tags: any;
  inspectordata: any = [];
  DBCreate: any;
  version: any;
  status: number;
  timehandle: any;
  OSType: any;
  IsActive: any;
  Remark: any;
  constructor(
    public dialogRef: MatDialogRef<Fetcheditdialog>, private _formBuilder: FormBuilder, public objService: GenericService, private _snackBar: MatSnackBar, public router: Router, public fetch: FetchDataComponent,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
    this.edit();
    

  };
  Prerequisites: any = [];
  onNoClick(): void {
    if(this.data.Name[this.data.index].UID =="nouid"){
      this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/fetch-data']);
      });
    }
    this.dialogRef.close();
  }



  edit() {
    this.data;
    this.Inspectorname = this.data.Name[this.data.index].Name;
    this.Binaryname = this.data.Name[this.data.index].BinaryName;
    this.SystemIP = this.data.Name[this.data.index].SystemIP;
    // this.Path=this.data.Name[this.data.index].Path;
    this.Recieveport = this.data.Name[this.data.index].PortRx;
    this.TXport = this.data.Name[this.data.index].PortTx;
    this.version = this.data.Name[this.data.index].Version;
    this.status = this.data.Name[this.data.index].status;
    this.OSType = this.data.Name[this.data.index].OSType;
    this.IsActive = this.data.Name[this.data.index].IsActive;
    this.Remark = this.data.Name[this.data.index].Remark;
  }




  checkinspectorstatus() {
    //  this.inspectordata.push({InspectorIp:this.SystemIP,InspectorPort:this.Recieveport});
    this.inspectordata = this.SystemIP + "$" + this.Recieveport + "$" + this.Inspectorname + "$" + this.Binaryname + "$" + this.TXport;
    this.objService.checkinspectorstatus(this.inspectordata).subscribe((datas: any) => {
      if (datas.result == "false") {
        this.status = 0;
        this.version="";
        this.Insertinspectordata();

      }
      else if(this.version=="Cannot Communicate with Core"){
        this.Insertinspectordata();
        this.openSnackBar("Connection Failed", "Failed");  


      }
      else {
        this.version = datas.result;
        this.status = 1;
        this.Insertinspectordata();

      }
      // if (datas.result.length > 0) {
      //   this.version = datas.result;
      //   if (this.version == "false") {
      //     this.status = 0;
      //   }
      //   else {
      //     this.status = 1;
      //   }
      //   this.Insertinspectordata();


      // }
    });
  }

  Insertinspectordata() {
    //  this.inspectordata.push({InspectorIp:this.SystemIP,InspectorPort:this.Recieveport});
    this.inspectordata = this.Inspectorname + "$" + this.Binaryname + "$" + this.SystemIP + "$" + this.Recieveport + "$" + this.TXport + "$" + this.OSType + "$" + this.IsActive + "$" + this.version + "$" + this.status + "$" + this.data.Name[this.data.index].UID;
    this.objService.updateinspectordata(this.inspectordata).subscribe((datas: any) => {
      if (datas.ResultData > 0) {
        this.Response = datas.ResultData;
        this.Response = this.Response

        //  this.fetch.fetchinspectordata();
        this.openSnackBar("Inspector Updated", "Successfully");

        this.dialogRef.close();
        //window.location.href = window.location.href;
        this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/fetch-data']);
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
  selector: 'dialog-overview-fetch-dialog',
  templateUrl: 'fetchdelete-dialog.component.html',
})
export class Fetchdeletedialog {
  Response: any;
  constructor(
    public dialogRef: MatDialogRef<Fetchdeletedialog>, private _formBuilder: FormBuilder, public objService: GenericService, private _snackBar: MatSnackBar, public router: Router, public fetch: FetchDataComponent,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
    // this.deleteinspectordata();

  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteinspectordata() {
    //  this.inspectordata.push({InspectorIp:this.SystemIP,InspectorPort:this.Recieveport});


    this.objService.deleteinspectordata(this.data.Name[this.data.index].UID).subscribe((datas: any) => {
      if (datas.length > 0) {
        this.Response = datas;
        this.Response = this.Response
        if(this.Response=="0"){
          this.openSnackBar("Row Deleted", "Successfully");
          

      }
      else{
        this.openSnackBar(this.Response, "Failed");
       
      }
        this.onNoClick();
        this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/fetch-data']);
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
interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
