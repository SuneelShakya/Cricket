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
  selector: 'app-StructureofTeamPlayer',
  templateUrl: './StructureofTeamPlayer.component.html',
  styleUrls: ['./StructureofTeamPlayer.component.css']

})
export class StructureofTeamPlayerComponent {
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
      this.router.navigateByUrl('/StructureofTeamPlayer');

    }
    this.fetchStructureTeamdata();
    
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

  fetchStructureTeamdata() {
    this.objService.fetchStructureTeamdata().subscribe((datas: any) => {
      if (datas.ResultData.length > 0) {
        this.inspectordata = datas.ResultData;
        this.refreshdata.push(this.inspectordata);
        this.sortedData = this.inspectordata;
      }
    });
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





}



interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
