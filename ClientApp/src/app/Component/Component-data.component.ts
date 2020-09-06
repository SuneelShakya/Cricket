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
  selector: 'app-Component-data',
  templateUrl: './Component-data.component.html',
  styleUrls: ['./Component-data.component.css']

})
export class ComponentDataComponent {
  public forecasts: WeatherForecast[];
  componentdata: any;
  name: any;
  animal: any;
  EditIndex: any;
  Response: any;
  searchText:any;
  sortedData: any;
  displayedColumns: string[] = ['Sno','Name', 'BinaryName', 'SystemIP', 'PortRx','PortTx','Version','IsActive','OSType','Action'];
  dataSource :any;
  constructor(
    public objService: GenericService,public dialog: MatDialog,private _snackBar: MatSnackBar,public router: Router) {}
  
    ngOnInit() {
      var user = localStorage.getItem('user')
    if(user=="" || user==undefined ||user==null){
      this.router.navigateByUrl('/counter');

    }
    else{
      this.router.navigateByUrl('/Component-data');

    }
      this.fetchcomponentdata();
    };
  fetchcomponentdata(){

      this.objService.fetchComponentdata().subscribe((datas: any) => {
         if (datas.ResultData.length > 0) {
          this.componentdata = datas.ResultData;
          this.sortedData = this.componentdata;
          // this.componentdata = this.componentdata.ResultData;
          
         }
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
    const dialogRef = this.dialog.open(Componentdialog, {
      // width: '50vw',
      // height:'400px',
      data: {index:index,Name:this.componentdata,status:data}
    });

}

openeditDialog(index:any,data): void {
  const dialogRef = this.dialog.open(Componenteditdialog, {
    // width: '50vw',
    // height:'30vh',
    data: {index:index,Name:this.componentdata,status:data}
  });

}



opendeleteDialog(data:any): void {
  const dialogRef = this.dialog.open(Componentdeletedialog, {
    width: '400px',
    height:'150px',
    data: {index:data,Name:this.componentdata}
  });

}

}

@Component({
  selector: 'dialog-overview-component-dialog',
  templateUrl: 'Component-dialog.component.html',
})
export class Componentdialog {
  
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
  constructor(
    public dialogRef: MatDialogRef<Componentdialog>,private _formBuilder: FormBuilder,public objService: GenericService,private _snackBar: MatSnackBar,public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    ngOnInit() {
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


 

  

   InsertComponentdata(){
     this.componentArray.push({Name:this.componentname,BinaryName:this.Binaryname,Path:this.path,Type:this.type,OSType:this.OSType,EDStatus:this.EDStatus,version:this.version,Status:this.status,Reference:this.Reference});
    this.objService.InsertComponentdata(this.componentArray).subscribe((datas: any) => {
      if (datas.ResultData.length > 0) {
       this.componentdata = datas.ResultData
      //  this.componentdata = this.componentdata.ResultData;
       
      }
      this.dialogRef.close();
      this.openSnackBar("Component Data Inserted","Success")
      this.router.navigateByUrl('/counter', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/Component-data']);
      });
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
        this.router.navigate(['/Component-data']);
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
  
    edit(){
    
      
      this.componentname=this.data.Name[this.data.index].name;
      this.Binaryname=this.data.Name[this.data.index].binaryname;
       this.path=this.data.Name[this.data.index].path;
      this.type=this.data.Name[this.data.index].Type;
      this.OSType=this.data.Name[this.data.index].OSType;
      this.EDStatus=this.data.Name[this.data.index].IsActive;
      this.version=this.data.Name[this.data.index].version;
      this.status=this.data.Name[this.data.index].status.toString();
      this.Reference=this.data.Name[this.data.index].ref;

      
    
    
      }

  


  

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}




@Component({
  selector: 'dialog-overview-component-dialog',
  templateUrl: 'Componentdelete-dialog.component.html',
})
export class Componentdeletedialog {
  Response: any;
  constructor(
    public dialogRef: MatDialogRef<Componentdeletedialog>,private _formBuilder: FormBuilder,public objService: GenericService,private _snackBar: MatSnackBar,public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    ngOnInit() {
    
    };
    Prerequisites:any=[];
  onNoClick(): void {
    this.dialogRef.close();
  }

  deletecomponentdata(){
    //  this.inspectordata.push({InspectorIp:this.SystemIP,InspectorPort:this.Recieveport});

    
     this.objService.deletecomponentdata(this.data.Name[this.data.index].UID).subscribe((datas: any) => {
        if (datas.length > 0) {
          this.Response= datas;
          this.Response= this.Response;
          if(this.Response=="0"){
          this.openSnackBar("Component Deleted","Successfully");
          }
          else{
            this.openSnackBar(this.Response,"Failed");

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
  templateUrl: 'Componentedit-dialog.component.html',
})
export class Componenteditdialog {
  Response: any;
  flowdata: any;
  searchText: any;
  constructor(
    public dialogRef: MatDialogRef<Componentdeletedialog>,private _formBuilder: FormBuilder,public objService: GenericService,private _snackBar: MatSnackBar,public router: Router,
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
