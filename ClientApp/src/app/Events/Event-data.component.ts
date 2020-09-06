import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../services/Generic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogData } from '../home/home.component';
import { FormBuilder } from '@angular/forms';
import { reference } from '@angular/core/src/render3';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-Event-data',
  templateUrl: './Event-data.component.html',
  styleUrls: ['./Event-data.component.css']

})
export class EventDataComponent {
  public forecasts: WeatherForecast[];
  componentdata: any;
  name: any;
  animal: any;
  EditIndex: any;
  Response: any;
  searchText:any;
  sortedData: any;
  allDevices: any;
  
  constructor(
    public objService: GenericService,public dialog: MatDialog,private _snackBar: MatSnackBar,public router: Router) {}
  
    ngOnInit() {
    //   var user = localStorage.getItem('user')
    // if(user=="" || user==undefined ||user==null){
    //   this.router.navigateByUrl('/counter');

    // }
    // else{
    //   this.router.navigateByUrl('/Component-data');

    // }
    this.devices();
      this.fetchcomponentdata();
    };
  fetchcomponentdata(){

      this.objService.fetchEventdata().subscribe((datas: any) => {
         if (datas.ResultData.length > 0) {
          this.componentdata = datas.ResultData;
          this.sortedData = this.componentdata;
          // this.componentdata = this.componentdata.ResultData;
          
         }
       });
    
  }

  devices() {
    this.objService.Devices().subscribe((device:any) => {
      this.allDevices =device.ResultData;
    });
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
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'binaryname': return this.compare(a.binaryname, b.binaryname, isAsc);
        case 'path': return this.compare(a.path, b.path, isAsc);
        case 'Type': return this.compare(a.Type, b.Type, isAsc);
        case 'OSType': return this.compare(a.OSType, b.OSType, isAsc);
        case 'IsActive': return this.compare(a.IsActive, b.IsActive, isAsc);
        case 'version': return this.compare(a.version, b.version, isAsc);
        case 'ref': return this.compare(a.ref, b.ref, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  clone(val:any){
    // this.componentdata[val].shift();
    this.componentdata.splice(val+1,0,{UID:"nouid",name:this.componentdata[val].name,binaryname:this.componentdata[val].binaryname,path:this.componentdata[val].path,Type:this.componentdata[val].Type,OSType:this.componentdata[val].OSType,IsActive:this.componentdata[val].IsActive,version:this.componentdata[val].version,status:this.componentdata[val].status,Reference:this.componentdata[val].Reference})
    this.openDialog(val+1,"edit");
  }


  

  openDialog(index:any,data): void {
    const dialogRef = this.dialog.open(Eventdialog, {
      // width: '50vw',
      // height:'400px',
      data: {index:index,Name:this.componentdata,status:data,Devices:this.allDevices}
    });

}

openeditDialog(index:any,data): void {
  const dialogRef = this.dialog.open(Eventeditdialog, {
    // width: '50vw',
    // height:'30vh',
    data: {index:index,Name:this.componentdata,status:data}
  });

}



opendeleteDialog(data:any): void {
  const dialogRef = this.dialog.open(Eventdeletedialog, {
    width: '400px',
    height:'150px',
    data: {index:data,Name:this.componentdata}
  });

}

}

@Component({
  selector: 'dialog-overview-component-dialog',
  templateUrl: 'Event-dialog.component.html',
})
export class Eventdialog {
  
  username: any="";
  password: any="";
  Port: any="";
  dbinfo: any=[];
  IP: any;
  Response: any;
  splitdata: any;
  DBname: any;
  MAMDBuser: any;
  DBCheck:any;
  MAMDBpassword: any;
  componentname:any;
  Binaryname:any;
  nameparameter:any;
  argvalue:any;
  detail:any;
  TXport:any;
  Comments:any;
  tags:any;
  inspectordata: any=[];
  DBCreate: any;
  version: any;
  status: number;
  componentdata: any=[];
  ArgArray: any=[];
  path: string;
  type: string;
  Reference: string;
  editstatus:any;
  ArgtableArray: any=[];
  update: string;
  componentArray: any=[];
  UID:any=[];
  deleteindex: any;
  OSType: any;
  EDStatus: any;
  allDevices: any;
  transferprofiles: any;
  EventArray: any = [];
  Source: any;
  Destination: any;
  Playlist: any;
  PlaylistDays: any;
  Extension: any;
  transferprofile: any;
  Asrun: any;
  AsrunDays: any;
  Hours: any;
  Preview: any;
  jobtime: any;
  jobexecutionstandard: any;
  EventType: any;
  Size: any;
  datecreatedtime: any;
  datecreatedstandard: any;
  deeparchive: any;
  IngestHours: any;
  deletemedia: any;
  Event: any;
  DeviceCategory: any;
  MissingHours: any;
  OnAir: any;
  Email: any;
  Channel: any;
  profiledata: any;
  components: any;
  Component: any;
  Profile: any;
  Operation: any;
  checkid: any;
  Extentions: any=[];
  channelData: any;
  EventName: any;
  
  constructor(
    public dialogRef: MatDialogRef<Eventdialog>,private _formBuilder: FormBuilder,public objService: GenericService,private _snackBar: MatSnackBar,public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    ngOnInit() {
      this.allDevices = this.data.Devices;
      this.GetChannelList();
      this.GetTransfers()
      this.GetComponent();
      this.GetProfiledata();
      if( this.data.status=="edit"){
        this.update=this.data.status
        this.edit();
      }
    };
    Prerequisites:any=[];
  onNoClick(): void {
    if(this.data.index!="x"){
    if(this.data.Name[this.data.index].UID =="nouid"){
      this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/fetch-data']);
      });
    } 
  }
    this.dialogRef.close();
  }

  getExtensions(val: any) {
    var index = this.allDevices.findIndex((item: any) => item.uid === val);
    if (this.allDevices[index].devicetype.toUpperCase() == "PRI")
      this.Extentions = this.objService.priExtentions;
    else if (this.allDevices[index].devicetype.toUpperCase() == "SEC")
      this.Extentions = this.objService.secExtentions;
  }

  devices() {
    this.objService.Devices().subscribe((device:any) => {
      this.allDevices =device.ResultData;
    });
  }

  GetTransfers() {
    this.objService.GetTransfers().subscribe(datas => {
      if (JSON.parse(datas).ResultData.length > 0) {
        this.transferprofiles = JSON.parse(datas).ResultData;
      }
    });
  }

  GetProfiledata() {
    this.objService.fetchprofiledata('x','x','x').subscribe((datas: any) => {
      if (datas.ResultData.length > 0)
        this.profiledata = datas.ResultData;
    });
  }

  GetComponent() {
    this.objService.fetchComponentdata().subscribe((datas: any) => {
      if (datas.ResultData.length > 0) {
        this.components = datas.ResultData
      }
    });
  }

   InsertComponentdata(operation:any){
    if(operation == "Update"){
      this.checkid = this.data.Name[this.data.index].UID
      }
      else{
        this.checkid ="nouid";
      }
     if(this.EventType == "Archive"){
    this.EventArray.push({ UID:this.checkid, Operation:operation,EventType:this.EventType,EventName:this.EventName,Source:this.Source,Destination:this.Destination,Component:this.Component,Profile:this.Profile,Playlist:this.Playlist,PlaylistDays:this.PlaylistDays,Extension:this.Extension.toString(),transferprofile:this.transferprofile,Asrun:this.Asrun,AsrunDays:this.AsrunDays,Hours:this.Hours,Preview:this.Preview,jobtime:this.jobtime,jobexecutionstandard:this.jobexecutionstandard,Status:this.status});
     }
     else if(this.EventType == "DeepArchive"){
    this.EventArray.push({UID:this.checkid, Operation:operation,EventType:this.EventType,EventName:this.EventName,Source:this.Source,Destination:this.Destination,Component:this.Component,Profile:this.Profile,Size:this.Size,Extension:this.Extension.toString(),transferprofile:this.transferprofile,datecreatedstandard:this.datecreatedstandard,datecreatedtime:this.datecreatedtime,jobtime:this.jobtime,jobexecutionstandard:this.jobexecutionstandard,Status:this.status});
     }
     else if(this.EventType == "HouseKeeping"){
      this.EventArray.push({UID:this.checkid,Operation:operation,EventType:this.EventType,EventName:this.EventName,Source:this.Source,Destination:this.Destination,Component:this.Component,Profile:this.Profile,Playlist:this.Playlist,PlaylistDays:this.PlaylistDays,deeparchive:this.deeparchive,IngestHours:this.IngestHours,Asrun:this.Asrun,AsrunDays:this.AsrunDays,deletemedia:this.deletemedia,jobtime:this.jobtime,jobexecutionstandard:this.jobexecutionstandard,Status:this.status});
    }
    else if(this.EventType == "MissingTransfer"){
      this.EventArray.push({UID:this.checkid,Operation:operation, EventType:this.EventType,EventName:this.EventName, Event:this.Event, DeviceCategory:this.DeviceCategory,Component:this.Component,Profile:this.Profile, Source:this.Source,Destination:this.Destination,MissingHours:this.MissingHours,OnAir:this.OnAir,Email:this.Email,Extension:this.Extension.toString(),Channel:this.Channel,transferprofile:this.transferprofile,jobtime:this.jobtime,jobexecutionstandard:this.jobexecutionstandard,Status:this.status});
    }


    this.objService.addArchive(this.EventArray).subscribe((datas: any) => {
      if (datas.ResultData.length > 0) {
       this.componentdata = datas.ResultData
      //  this.componentdata = this.componentdata.ResultData;
       
      }
      this.dialogRef.close();
      if(operation =="Update"){
        this.openSnackBar("Event Data Updated","Success")
        this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/Event-data']);
        });
      }
      else{
      this.openSnackBar("Event Data Inserted","Success")
      this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/Event-data']);
      });
      }
      
      this.componentArray=[];
    });
    }


    EditComponent(){
      this.componentArray.push({Name:this.componentname,BinaryName:this.Binaryname,Path:this.path,Type:this.type,OSType:this.OSType,EDStatus:this.EDStatus,version:this.version,Status:this.status,Reference:this.Reference,UID:this.data.Name[this.data.index].UID});
    this.objService.updatecomponentdata(this.componentArray).subscribe((datas: any) => {
      if (datas.ResultData > 0) {
        this.dialogRef.close();
      this.openSnackBar("Component Data Updated","Success")
      this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/Event-data']);
      });
      }
      else{
        this.openSnackBar("Component Update Failed","Unsuccessfull")

      }
     
   
      this.componentArray=[];
    });
    }

    


      


      

        deletecomponentdata(){
          //  this.inspectordata.push({InspectorIp:this.SystemIP,InspectorPort:this.Recieveport});
      
          
           this.objService.deletecomponent(this.deleteindex).subscribe((datas: any) => {
              if (datas.result.length > 0) {
                this.Response= datas.result;
                this.Response= this.Response
                // this.openSnackBar("Inspector Created","Successfully");
                
                
              }
          
      
            });
          }

    

    editrow(val){
      let index = this.ArgArray.findIndex((record: any) => record.UID == this.ArgArray[val].Component);
    
      this.nameparameter=this.ArgArray[val].NameParameter
      this.argvalue=this.ArgArray[val].ArgumentValue
      this.detail=this.ArgArray[val].Detail
      this.ArgArray.splice(val,1);

    }

    GetChannelList() {
      this.objService.GetChannelList().subscribe((response:any) => {
        if (response.ResultData.length > 0)  
          this.channelData = response.ResultData;
        
      })
  }
  
    edit(){
      
     if(this.data.Name[this.data.index].sourcedevice!= null || undefined || ""){
       this.getExtensions(this.data.Name[this.data.index].sourcedevice)
     }
      this.Channel=this.data.Name[this.data.index].Channel;
      this.Component=this.data.Name[this.data.index].Component;
       this.datecreatedstandard=this.data.Name[this.data.index].DateCreatedStandard;
      this.datecreatedtime=this.data.Name[this.data.index].DateCreatedTime;
      this.Extension=this.data.Name[this.data.index].validextension.split(',');
      this.deeparchive=this.data.Name[this.data.index].DeepArchive;
      this.deletemedia=this.data.Name[this.data.index].DeleteMedia;
      this.DeviceCategory=this.data.Name[this.data.index].DeviceCategory;
      this.Source=this.data.Name[this.data.index].sourcedevice.toString();
      this.Email=this.data.Name[this.data.index].Email;
      this.Event=this.data.Name[this.data.index].Event;
      this.EventType=this.data.Name[this.data.index].EventType;
      this.IngestHours=this.data.Name[this.data.index].IngestHours;
      this.MissingHours=this.data.Name[this.data.index].MissingHours;
      this.Profile=this.data.Name[this.data.index].Profile;
      this.OnAir=this.data.Name[this.data.index].OnAir;
      this.Size=this.data.Name[this.data.index].Size;
      this.Asrun=this.data.Name[this.data.index].checkasrun;
      this.AsrunDays=this.data.Name[this.data.index].checkasrundays;
      this.Playlist=this.data.Name[this.data.index].checkplaylist;
      this.PlaylistDays=this.data.Name[this.data.index].checkplaylistdays;
      this.Preview=this.data.Name[this.data.index].checkpreview;
      this.Destination=this.data.Name[this.data.index].destinationdevice;
      this.jobtime=this.data.Name[this.data.index].jobexecutiontime;
      this.jobexecutionstandard=this.data.Name[this.data.index].jobexecutionstandard;
      this.status=this.data.Name[this.data.index].isactive;
      this.EventName=this.data.Name[this.data.index].EventName;


      
     
      }

  


  

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}




@Component({
  selector: 'dialog-overview-component-dialog',
  templateUrl: 'Eventdelete-dialog.component.html',
})
export class Eventdeletedialog {
  Response: any;
  constructor(
    public dialogRef: MatDialogRef<Eventdeletedialog>,private _formBuilder: FormBuilder,public objService: GenericService,private _snackBar: MatSnackBar,public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    ngOnInit() {
    
    };
    Prerequisites:any=[];
  onNoClick(): void {
    this.dialogRef.close();
  }

  deletecomponentdata(){
    //  this.inspectordata.push({InspectorIp:this.SystemIP,InspectorPort:this.Recieveport});

    
     this.objService.deleteEventdata(this.data.Name[this.data.index].UID).subscribe((datas: any) => {
        if (datas.length > 0) {
          this.Response= datas;
          this.Response= this.Response;
          
          this.openSnackBar("Event Deleted","Successfully");
        
         
          this.dialogRef.close();
          this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/Event-data']);
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
  templateUrl: 'Eventedit-dialog.component.html',
})
export class Eventeditdialog {
  Response: any;
  flowdata: any;
  searchText: any;
  constructor(
    public dialogRef: MatDialogRef<Eventdeletedialog>,private _formBuilder: FormBuilder,public objService: GenericService,private _snackBar: MatSnackBar,public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    ngOnInit() {
    this.fetchflowdatadata();
    };
    Prerequisites:any=[];
  onNoClick(): void {
    this.dialogRef.close();
  }

  fetchflowdatadata() {
    this.objService.fetchflowdata().subscribe((datas: any) => {
      //var x = JSON.parse(datas);
      if (datas.ResultData.length > 0)
        this.flowdata = datas.ResultData;
        this.searchText=this.data.Name[this.data.index].fname;
    });
  }
}
interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
