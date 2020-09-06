import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { GenericService } from '../services/Generic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
//import * as $ from 'jquery';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']

})
export class ProfileComponent implements OnInit {
  objCls: ProfileProperties = new ProfileProperties();
  componentdata: any = [];
  popup: any = "";
  BtnText: any = "";
  flowdata: any;
  EditMainIndex: any;
  deleteuid: any;
  isLoading: boolean;
  sortedData: any;
  searchText:any;
  length = 100;
  pageSize = 10;
  pageSizeOptions: any = [5, 10, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  curPage: number;
  
  constructor(
    public objService: GenericService, private _snackBar: MatSnackBar, public dialog: MatDialog,public router: Router) { }
  ngOnInit() {
    var user = localStorage.getItem('user')
    if(user=="" || user==undefined ||user==null){
      this.router.navigateByUrl('/counter');

    }
    else{
      this.router.navigateByUrl('/profile-data');

    }
    this.fetchdata();
  };

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  Reset() {
    //this.CancelEditPartial();
    this.objCls = new ProfileProperties();
    this.popup = "";
    this.BtnText = "";
    this.fetchdata();
  }
  fetchdata(event?: PageEvent) {
    if (event) {
      this.pageSize = event.pageSize;
      this.curPage = event.pageIndex + 1;
    } else {
      this.paginator.pageIndex = 0;
      this.curPage = 1;
    }
    this.objService.fetchprofiledata(this.pageSize, this.curPage,this.searchText).subscribe((datas: any) => {
      //var x = JSON.parse(datas);
      if (datas.ResultData.length > 0)
        this.flowdata = datas.ResultData;
        this.sortedData = this.flowdata;
        this.length = this.flowdata[0].tlength;

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
        case 'Name': return this.compare(a.name, b.name, isAsc);
        case 'Parameters': return this.compare(a.Parameters, b.Parameters, isAsc);
        case 'ProfileType': return this.compare(a.ProfileType, b.ProfileType, isAsc);
        case 'Inputfile': return this.compare(a.Inputfile, b.Inputfile, isAsc);
        case 'Outputfile': return this.compare(a.Outputfile, b.Outputfile, isAsc);
        case 'Date': return this.compare(a.Date, b.Date, isAsc);
        case 'IsActive': return this.compare(a.IsActive, b.IsActive, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  Editmain(obj, i) {
    this.EditMainIndex = i;
    this.objCls.UID = obj.UID;
    this.objCls.Name = obj.Name;
    this.objCls.ProfileType = obj.ProfileType;
    this.objCls.Inputfile = obj.Inputfile;
    this.objCls.Outputfile = obj.Outputfile;
    this.objCls.Parameters = obj.Parameters;//.split(',');
    this.objCls.IsActive = obj.IsActive;
    this.popup = "Edit";
    this.BtnText = "Update";
    this.openDialog('open');
  }
  saveFlow() {
    //alert(this.objCls.Parameters);
    //var x = this.objCls.Parameters.join(',');
    //this.objCls.Parameters = x;
    this.isLoading = true;
    this.objCls.OperationName = this.BtnText;
    this.objService.Insertprofiledata(this.objCls).subscribe((datas: any) => {
      if (datas.toLowerCase() == "success") {
        this.openSnackBar("New Profile " + this.objCls.OperationName + " successfully", "Success");
        this.Reset();
        this.openDialog("close");
        this.isLoading = false;
      }
      else if (datas.toLowerCase() == "fail") {
        this.openSnackBar("New Profile not " + this.objCls.OperationName + "", "Warning");
        this.isLoading = false;
      }
    });
  }
  deleteFlow() {
    this.isLoading = true;
    this.objCls.OperationName = "Delete";
    this.objCls.UID = this.deleteuid;
    this.objService.Insertprofiledata(this.objCls).subscribe((datas: any) => {
      if (datas.toLowerCase() == "success") {
        this.openSnackBar("Profile Deleted successfully", "Success");
        this.Reset();
        //this.openDialog("close");
        this.HideDialog();
        this.isLoading = false;
      }
      else if (datas.toLowerCase() == "fail") {
        this.openSnackBar("Profile is already in use", "Error");
        this.HideDialog();
        this.isLoading = false;
      }
    });
  }
  AddNew(val) {
    this.objCls = new ProfileProperties();
    this.popup = "Create New";
    this.BtnText = "Save";
    // this.objService.data = this.objCls;
    // const dialogRef = this.dialog.open(DialogProfileCreate, {
    //   width: '60vw'
    // });
    // dialogRef.beforeClosed().subscribe((result: any) => {
    //   this.objCls = result;
    //   this.saveFlow();
    //   console.log(result);
    // });
    this.openDialog(val);
  }

  openDialog(val) {
    var modal = document.getElementById("entryModal");
    modal.style.display = val == 'open' ? "block" : "none";
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

class ProfileProperties {
  UID: any = "0";
  Name: any = "";
  IsActive: any = "";
  ProfileType: any = "";
  Inputfile: any = "-i $inputpath";
  Outputfile: any = "-o $outputpath";
  Parameters: any = "";
  OperationName: any = "";
}

@Component({
  selector: 'profile-dialog-CD',
  templateUrl: 'profilecd.component.html',
})
export class DialogProfileCreate {
  addOnBlur = true;
  //readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  readonly separatorKeysCodes: number[] = [ENTER];
  selectable = true;
  removable = true;
  data: any;
  popup: any = "Create";
  BtnText: any = "Save";
  sortedData: any;
  constructor(
    public dialogRef: MatDialogRef<DialogProfileCreate>, private snackBar: MatSnackBar, public dialogser: GenericService) {
    this.data = this.dialogser.data;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  add(event: MatChipInputEvent, key: any): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      const index = this.data[key].indexOf(value);
      if (index >= 0) {
        this.snackBar.open("Parameter already exits!!", "Error", {
          duration: 2000,
        });
        //this.openSnackBar("Parameter already exits!!", "Error");
      }
      else
        this.data[key].push(value.trim());
      //this.fruits.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    //alert(this.objCls[key]);
  }
  remove(fruit: any, key: any): void {
    const index = this.data[key].indexOf(fruit);
    if (index >= 0) {
      this.data[key].splice(index, 1);
    }
  }

  

}

// @Component({
//   selector: 'profile-dialog-CD',
//   templateUrl: 'profilecd.component.html',
// })
// export class DialogProfileEdit {
//   data: any;
//   popup: any;
//   constructor(
//     public dialogRef: MatDialogRef<DialogProfileEdit>, public dialogser: GenericService) {
//     this.data = this.dialogser.data;
//     this.popup = "Edit";
//   }
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }