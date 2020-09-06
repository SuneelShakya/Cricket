import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../services/Generic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogData } from '../home/home.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-flow-data',
  templateUrl: './flow-data.component.html',
  styleUrls: ['./flow-data.component.css']

})
export class FlowDataComponent {
  public forecasts: WeatherForecast[];
  componentdata: any;
  name: any;
  animal: any;
  EditIndex: any;
  Response: any;
  inspectorname: any = [];
  componentname: any = [];
  testarray: any = [];
  searchText:any;

  constructor(
    public objService: GenericService, public dialog: MatDialog, private _snackBar: MatSnackBar, public router: Router) { }

  ngOnInit() {
    this.fetchflowdatadata();
  };
  fetchflowdatadata() {
    this.objService.fetchflowdata().subscribe((datas: any) => {
      if (datas.result.length > 0) {
        this.componentdata = JSON.parse(datas.result)
        this.componentdata = this.componentdata.ResultData;

      }
    });
  }





  clone(val: any) {
    // this.componentdata[val].shift();
    this.componentdata.splice(val + 1, 0, { UID: "nouid", Name: this.componentdata[val].Name, inspectorname: this.componentdata[val].inspectorname, Inspector: this.componentdata[val].Inspector, Component: this.componentdata[val].Component, ID: this.componentdata[val].Component, System: this.componentdata[val].System, Version: this.componentdata[val].Version, status: this.componentdata[val].Status })
  }


  deletecomponentdata(val: any) {
    //  this.inspectordata.push({InspectorIp:this.SystemIP,InspectorPort:this.Recieveport});


    this.objService.deleteflowdata(this.componentdata[val].Name).subscribe((datas: any) => {
      if (datas.result.length > 0) {
        this.Response = datas.result;
        this.Response = this.Response
        // this.openSnackBar("Inspector Created","Successfully");


      }
      this.componentdata.splice(val, 1);

    });
  }




  openDialog(data: any, index): void {


    const dialogRef = this.dialog.open(Flowdialog, {
      width: '800px',
      height: '600px',
      data: { data: data, Name: this.componentdata, index: index }
    });

  }

  openeditDialog(data: any): void {
    const dialogRef = this.dialog.open(Floweditdialog, {
      width: '800px',
      height: '600px',
      data: { index: data, Name: this.componentdata }
    });

  }

  opendeleteDialog(data: any): void {
    const dialogRef = this.dialog.open(Flowdeletedialog, {
      width: '400px',
      height: '150px',
      data: { index: data, Name: this.componentdata }
    });

  }

}

@Component({
  selector: 'dialog-overview-component-dialog',
  templateUrl: 'Flow-dialog.component.html',
})
export class Flowdialog {
  searchFilter: any;
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
  flowname: any;
  selectedinspectorname: any;
  selectedcomponent: any;
  // component2:any;
  // component3:any;
  systemid: any;
  Comments: any;
  tags: any;
  inspectordata: any = [];
  DBCreate: any;
  version: any;
  status: number;
  flowdata: string;
  componentname: any;
  seqno: string;
  inspectorname: any;
  update: any;
  ArgArray: any = [];
  compdata: any = [];
  componentArray: any;
  UID: any;
  compindex: any;
  deleteindex: any;
  constructor(
    public dialogRef: MatDialogRef<Flowdialog>, private _formBuilder: FormBuilder, public objService: GenericService, private _snackBar: MatSnackBar, public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
    this.fetchcomponentname();
    this.fetchinspectorname();

    if (this.data.data == "edit") {
      this.update = this.data.data;
      this.edit();
    };
  };
  Prerequisites: any = [];
  onNoClick(): void {
    this.dialogRef.close();
  }
  fetchcomponentname() {

    this.objService.fetchcomponentname().subscribe((datas: any) => {
      if (datas.result.length > 0) {
        this.componentname = JSON.parse(datas.result)
        this.componentname = this.componentname.ResultData;

      }
    });


  }
  fetchinspectorname() {

    this.objService.fetchinspectorname().subscribe((datas: any) => {
      if (datas.result.length > 0) {
        this.inspectorname = JSON.parse(datas.result)
        this.inspectorname = this.inspectorname.ResultData;


      }
    });


  }
  updateflowcomp() {
    if (this.data.Name[this.data.index].UID == "nouid") {
      // this.ArgArray[this.data.index].push({ID:this.ArgArray[this.data.index].Component})
      this.Insertflowcomp();
    }
    else {
      if (this.deleteindex != null || this.deleteindex != undefined) {
        this.deletecomponentdata();
      }
      for (var i = 0; i < this.ArgArray.length; i++) {
        this.compdata.push({ Name: this.flowname, Inspector: this.selectedinspectorname, Component: this.ArgArray[i].ID, SeqNo: this.ArgArray[i].SeqNo, System: this.systemid, Version: this.version, Status: this.status, UID: this.UID[i].UID });
      }
      this.objService.updateflowcomp(this.compdata).subscribe((datas: any) => {
        if (datas.result.length > 0) {
          this.inspectorname = JSON.parse(datas.result)
          this.inspectorname = this.inspectorname.ResultData;

        }
      });
    }
  }

  deletecomponentdata() {
    //  this.inspectordata.push({InspectorIp:this.SystemIP,InspectorPort:this.Recieveport});


    this.objService.deleteflowrow(this.deleteindex).subscribe((datas: any) => {
      if (datas.result.length > 0) {
        this.Response = datas.result;
        this.Response = this.Response
        // this.openSnackBar("Inspector Created","Successfully");


      }


    });
  }

  fetchcomponents() {

    this.objService.fetchflowcomp(this.data.Name[this.data.index].Name).subscribe((datas: any) => {
      if (datas.result.length > 0) {
        this.componentArray = JSON.parse(datas.result)
        this.componentArray = this.componentArray.ResultData;
        this.ArgArray = this.componentArray;
        for (var i = 0; i < this.componentArray.length; i++) {
          this.UID.push(this.componentArray[i].UID)

        }

      }
    });


  }

  fetchUID() {

    this.objService.fetchUID(this.data.Name[this.data.index].Name).subscribe((datas: any) => {
      if (datas.result.length > 0) {
        this.UID = JSON.parse(datas.result)
        this.UID = this.UID.ResultData;

      }
    });


  }

  edit() {
    this.fetchcomponents();
    this.fetchUID();
    this.data;
    this.flowname = this.data.Name[this.data.index].Name;
    this.selectedinspectorname = this.data.Name[this.data.index].Inspector.toString();
    // this.selectedcomponent=this.data.Name[this.data.index].Component;
    // this.seqno=this.data.Name[this.data.index].SeqNo;
    // this.component3=this.data.Name[this.data.index].Component3;
    this.systemid = this.data.Name[this.data.index].System;
    this.version = this.data.Name[this.data.index].Version;
    this.status = this.data.Name[this.data.index].status;

  }
  Addrow() {
    this.ArgArray.push({ name: this.componentname[this.selectedcomponent].Name, ID: this.componentname[this.selectedcomponent].UID, SeqNo: this.seqno })

    this.selectedcomponent = "";
    this.seqno = "";

  }

  Deleterow(val: any) {
    this.deleteindex = this.ArgArray[val].UID
    this.ArgArray.splice(val, 1);

  }

  getindex(index: any) {
    this.compindex = index;

  }


  Insertflowcomp() {
    for (var i = 0; i < this.ArgArray.length; i++) {

      this.compdata.push({ Name: this.flowname, Inspector: this.selectedinspectorname, Component: this.ArgArray[i].ID, SeqNo: this.ArgArray[i].SeqNo, System: this.systemid, Version: this.version, Status: this.status });
    }
    this.objService.Insertflowcomp(this.compdata).subscribe((datas: any) => {
      if (datas.length > 0) {
        this.inspectorname = JSON.parse(datas)
        this.inspectorname = this.inspectorname.ResultData;
        this.openSnackBar("Flow Created", "Successfully");
      }
      this.dialogRef.close()
      this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/Flow-data']);
      });
      this.compdata = [];
    });
  }


  //  checkinspectorstatus(){
  //  //  this.inspectordata.push({InspectorIp:this.SystemIP,InspectorPort:this.Recieveport});
  //  this.inspectordata=this.argvalue+"$"+this.componentname+"$"+this.Binaryname+"$"+this.TXport;
  //   this.objService.checkinspectorstatus(this.inspectordata).subscribe((datas: any) => {
  //      if (datas.result.length > 0) {
  //        this.version= datas.result;
  //        if(this.version=="false"){
  //          this.status=0;
  //        }
  //        else{
  //          this.status=1;
  //        }
  //      this.InsertComponentdata();


  //      }
  //    });
  //  }

  Insertflowdata() {
    //  this.inspectordata.push({InspectorIp:this.SystemIP,InspectorPort:this.Recieveport});
    this.flowdata = this.flowname + "$" + this.selectedinspectorname + "$" + this.selectedcomponent + "$" + this.seqno + "$" + this.systemid + "$" + this.version + "$" + this.status;
    this.objService.Insertflowdata(this.flowdata).subscribe((datas: any) => {
      if (datas.result.length > 0) {
        this.Response = datas.result;
        this.Response = this.Response
        this.openSnackBar("Component Created", "Successfully");

        this.dialogRef.close()
        this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/Flow-data']);
        });
        this.Insertflowcomp();
      }

    });
  }



  editrow(val) {
    //componentname
    console.log(this.ArgArray);
    console.log(this.componentname)
    let index = this.componentname.findIndex((record: any) => record.UID == this.ArgArray[val].Component);
    this.selectedcomponent = index;//this.ArgArray[val].name
    this.seqno = this.ArgArray[val].SeqNo
    this.ArgArray.splice(val, 1);
  }

  Updateflowdata() {
    //  this.inspectordata.push({InspectorIp:this.SystemIP,InspectorPort:this.Recieveport});
    this.flowdata = this.flowname + "$" + this.selectedinspectorname + "$" + this.systemid + "$" + this.version + "$" + this.status + "$" + this.data.Name[this.data.index].UID;

    this.objService.updateflowdata(this.flowdata).subscribe((datas: any) => {
      if (datas.result.length > 0) {
        this.Response = datas.result;
        this.Response = this.Response
        this.updateflowcomp();
        //  this.fetch.fetchinspectordata();
        this.openSnackBar("Component Updated", "Successfully");

        this.dialogRef.close();
        this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/Flow-data']);
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
  selector: 'dialog-overview-Component-dialog',
  templateUrl: 'Flowedit-dialog.component.html',
})
export class Floweditdialog {

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
  flowname: any;
  selectedinspectorname: any;
  selectedcomponent: any;
  // component2:any;
  // component3:any;
  systemid: any;
  Comments: any;
  tags: any;
  inspectordata: any = [];
  DBCreate: any;
  version: any;
  status: number;
  flowdata: string;
  seqno: string;
  constructor(
    public dialogRef: MatDialogRef<Floweditdialog>, private _formBuilder: FormBuilder, public objService: GenericService, private _snackBar: MatSnackBar, public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
    this.edit();
  };
  Prerequisites: any = [];
  onNoClick(): void {
    this.dialogRef.close();
  }

  edit() {
    this.data;
    this.flowname = this.data.Name[this.data.index].Name;
    this.selectedinspectorname = this.data.Name[this.data.index].Inspector;
    this.selectedcomponent = this.data.Name[this.data.index].Component;
    this.seqno = this.data.Name[this.data.index].SeqNo;
    // this.component3=this.data.Name[this.data.index].Component3;
    this.systemid = this.data.Name[this.data.index].System;
    this.version = this.data.Name[this.data.index].version;
    this.status = this.data.Name[this.data.index].status;




  }




  //  checkinspectorstatus(){
  //  //  this.inspectordata.push({InspectorIp:this.SystemIP,InspectorPort:this.Recieveport});
  //  this.inspectordata=this.SystemIP+"$"+this.argvalue+"$"+this.componentname+"$"+this.Binaryname+"$"+this.detail+"$"+this.data.Name[this.data.index].UID;;
  //   this.objService.checkinspectorstatus(this.inspectordata).subscribe((datas: any) => {
  //      if (datas.result.length > 0) {
  //        this.version= datas.result;
  //        if(this.version=="false"){
  //          this.status=0;
  //        }
  //        else{
  //          this.status=1;
  //        }
  //      this.Insertinspectordata();


  //      }
  //    });
  //  }

  Updateflowdata() {
    //  this.inspectordata.push({InspectorIp:this.SystemIP,InspectorPort:this.Recieveport});
    this.flowdata = this.flowname + "$" + this.selectedinspectorname + "$" + this.selectedcomponent + "$" + this.seqno + "$" + this.systemid + "$" + this.version + "$" + this.status + "$" + this.data.Name[this.data.index].UID;

    this.objService.updateflowdata(this.flowdata).subscribe((datas: any) => {
      if (datas.result.length > 0) {
        this.Response = datas.result;
        this.Response = this.Response

        //  this.fetch.fetchinspectordata();
        this.openSnackBar("Component Updated", "Successfully");

        this.dialogRef.close();
        this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/Flow-data']);
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
  templateUrl: 'Flowdelete-dialog.component.html',
})
export class Flowdeletedialog {
  Response: any;
  constructor(
    public dialogRef: MatDialogRef<Floweditdialog>, private _formBuilder: FormBuilder, public objService: GenericService, private _snackBar: MatSnackBar, public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {

  };

  deletecomponentdata(val: any) {
    //  this.inspectordata.push({InspectorIp:this.SystemIP,InspectorPort:this.Recieveport});


    this.objService.deleteflowdata(this.data.Name[this.data.index].Name).subscribe((datas: any) => {
      if (datas.result.length > 0) {
        this.Response = datas.result;
        this.Response = this.Response
        this.openSnackBar("Flow Deleted", "Successfully");


      }
      this.dialogRef.close();
      this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/Flow-data']);
      });


    });
  }

  onNoClick(): void {
    this.dialogRef.close();
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
