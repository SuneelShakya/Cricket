import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { GenericService } from '../services/Generic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  objCls: GroupProperties = new GroupProperties();
  hideonNew: boolean = true;
  Layouts: any = [
    { Menu: "Inspector", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: false },
    { Menu: "Component", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: false },
    { Menu: "Profile", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: false },
    { Menu: "WorkFlow", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: false },
    { Menu: "Transaction", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: false }
  ];
  Name1: any = "";
  popup: any = "";
  BtnText: any = "";
  flowdata: any;
  EditMainIndex: any = "-1";
  deleteuid: any;
  isLoading: boolean;
  EditLayoutindex: any;
  BindGroupName: any;
  Menu: any;
  groupid: any;
  searchText:any;
  length = 100;
  pageSize = 10;
  pageSizeOptions: any = [5, 10, 25, 100];
  curPage: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  sortedData: any;
  constructor(
    public objService: GenericService, private _snackBar: MatSnackBar, public router: Router) { }
  ngOnInit() {
    this.fetchdata();
    var user = localStorage.getItem('user')
    if(user=="" || user==undefined ||user==null){
      this.router.navigateByUrl('/counter');

    }
    else{
      this.router.navigateByUrl('/group-data');

    }
    // this.objService.clockgmt = new Date("2020-07-14 12:04:05").toLocaleString("en-US", { timeZone: "Europe/Amsterdam", hour12: false });
    // var x = this.objService.clockgmt.split(',');
    // var x1 = x[0].split("/");
    // var fx = x1[1] + "/" + x1[0] + "/" + x1[2] + " " + x[1];
    // //this.objService.clockgmt = fx;
    // alert(fx)
    //this.objService.clockgmt = new Date().toLocaleString("en-US", { timeZone: "Asia/Singapore", hour12: false });
  };
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  ResetBtn() {
    this.Name1 = "";
    this.objCls.Name = "";
    this.hideonNew = true;
  }
  onselectChange(event) {
    //var c = event.value;
    if (event.value != "-1") {
      const ids = [];
      ids.push(event.value);
      var x = this.flowdata.filter((i: any) => ids.includes(i.Name));
      this.Layouts = [
        { Menu: "Inspector", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: false },
        { Menu: "Component", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: false },
        { Menu: "Profile", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: false },
        { Menu: "WorkFlow", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: false },
        { Menu: "Transaction", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: false }
      ];
      for (let index = 0; index < x.length; index++) {
        var t = this.Layouts.findIndex((record: any) => record.Menu == x[index].Menu);
        if (t != -1) {
          this.Layouts[t].hidden = true;
          this.Layouts[t].Read = x[index].Read;
          this.Layouts[t].Write = x[index].Write;
          this.Layouts[t].Delete = x[index].Delete;
          this.Layouts[t].IsActive = x[index].IsActive;
        }
      }
    }
    else {
      this.Layouts = [
        { Menu: "Inspector", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: false },
        { Menu: "Component", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: false },
        { Menu: "Profile", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: false },
        { Menu: "WorkFlow", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: false },
        { Menu: "Transaction", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: false }
      ];
      this.Name1 = "";
    }
  }
  Reset() {
    //this.CancelEditPartial();
    this.objCls = new GroupProperties();
    this.popup = "";
    this.BtnText = "";
    this.fetchdata();
  }
  setAll(completed: boolean, key: any, index: any) {
    this.Layouts[index][key] = (completed) ? "Y" : "N";
  }
  fetchdata(event?: PageEvent) {
    this.isLoading = true;
    if (event) {
      this.pageSize = event.pageSize;
      this.curPage = event.pageIndex + 1;
    } else {
      this.paginator.pageIndex = 0;
      this.curPage = 1;
    }
    this.objService.fetchGroupdata(this.pageSize, this.curPage).subscribe((datas: any) => {
      //var x = JSON.parse(datas);
      if (datas.ResultData.length > 0) {
        this.flowdata = datas.ResultData;
        this.sortedData = this.flowdata;
      }
      this.length = this.flowdata[0].tlength;

      this.BindGroupName = this.flowdata.map(item => item.Name).filter((value, index, self) => self.indexOf(value) === index);
      this.isLoading = false;
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
        case 'Menu': return this.compare(a.Menu, b.Menu, isAsc);
        case 'Date': return this.compare(a.Date, b.Date, isAsc);

        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  Editmain(obj, i) {
    this.EditLayoutindex = this.Layouts.findIndex((record: any) => record.Menu == obj.Menu);
    this.Layouts = [
      { Menu: "Inspector", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: true },
      { Menu: "Component", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: true },
      { Menu: "Profile", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: true },
      { Menu: "WorkFlow", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: true },
      { Menu: "Transaction", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: true }
    ];
    this.Layouts[this.EditLayoutindex].hidden = false;
    this.Layouts[this.EditLayoutindex].Read = obj.Read;
    this.Layouts[this.EditLayoutindex].Write = obj.Write;
    this.Layouts[this.EditLayoutindex].Delete = obj.Delete;
    this.EditMainIndex = i;
    this.objCls.UID = obj.UID;
    this.objCls.Name = obj.Name;
    //this.objCls.GroupType = obj.GroupType;
    //this.objCls.Inputfile = obj.Inputfile;
    //this.objCls.Outputfile = obj.Outputfile;
    //this.objCls.Parameters = obj.Parameters;//.split(',');
    this.objCls.GroupActive = obj.IsActive.toString();
    this.popup = "Edit";
    this.BtnText = "Update";
    this.openDialog('open');
  }
  saveFlow() {
    this.isLoading = true;
    var x;
    var result;
    var uid = this.objCls.UID;
    var Name = (this.Name1 == "") ? this.objCls.Name : this.Name1;
    var on = this.BtnText;
    this.objCls.GroupDetails = (on == "Save") ? this.Layouts : this.Layouts[this.EditLayoutindex];
    this.objCls.OperationName = this.BtnText;
    if (on == "Save") {
      result = this.Layouts.map(function (el) {
        var o = Object.assign({}, el);
        o.UID = uid;
        o.GroupActive = "1";
        o.Name = Name;
        o.OperationName = on;
        return o;
      });
      x = {
        data: result
      }
    }
    else {
      var r = []; r.push(this.Layouts[this.EditLayoutindex]);
      result = r.map(function (el) {
        var o = Object.assign({}, el);
        o.UID = uid;
        o.GroupActive = "1";
        o.Name = Name;
        o.OperationName = on;
        return o;
      });
      x = {
        data: result
      }
    }
    this.objService.InsertGroupdata(x).subscribe((datas: any) => {
      if (datas.toLowerCase() == "success") {
        this.openSnackBar("New Group " + this.objCls.OperationName + " successfully", "Success");
        this.Reset();
        this.openDialog("close");
        this.isLoading = false;
      }
      else if (datas.toLowerCase() == "fail") {
        this.openSnackBar("New Group not " + this.objCls.OperationName + "", "Warning");
        this.isLoading = false;
      }
    });
  }
  deleteFlow() {
    this.isLoading = true;
    this.objCls.OperationName = "Delete";
    this.objCls.UID = this.deleteuid;
    this.objCls.Name = this.groupid;
    this.objService.DeleteGroupdata(this.objCls).subscribe((datas: any) => {
      if (datas.toLowerCase() == "success") {
        this.openSnackBar("Group Deleted successfully", "Success");
        this.Reset();
        this.HideDialog();
        this.isLoading = false;
      }
      else if (datas.toLowerCase() == "duplicate") {
        this.openSnackBar("Group is already is use", "Error");
        this.HideDialog();
        this.isLoading = false;
      }
      else if (datas.toLowerCase() == "fail") {
        this.openSnackBar("System Error", "Error");
        this.HideDialog();
        this.isLoading = false;
      }
    });
  }
  AddNew(val) {
    this.Layouts = [
      { Menu: "Inspector", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: false },
      { Menu: "Component", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: false },
      { Menu: "Profile", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: false },
      { Menu: "WorkFlow", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: false },
      { Menu: "Transaction", Read: "Y", Write: "Y", Delete: "Y", IsActive: 1, hidden: false }
    ];
    this.objCls = new GroupProperties();
    this.popup = "Create New";
    this.BtnText = "Save";
    // this.objService.data = this.objCls;
    // const dialogRef = this.dialog.open(DialogGroupCreate, {
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
    if (val == "close") {
      this.EditMainIndex = "-1";
    }
  }
  sortTable(n: any) {
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.getElementsByTagName("TR");
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < rows.length - 1; i++) { //Change i=0 if you have the header th a separate table.
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        //Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
  Deletemain(val, menu, group) {
    var modal = document.getElementById("deleteModal");
    modal.style.display = "block";
    this.deleteuid = val;
    this.groupid = group;
    this.Menu = menu;
  }
  HideDialog() {
    var modal = document.getElementById("deleteModal");
    modal.style.display = "none";
  }
}
class GroupProperties {
  UID: any = "0";
  Name: any = "";
  GroupActive: any = "";
  GroupDetails: any = [];
  OperationName: any = "";
}


// @Component({
//   selector: 'Group-dialog-CD',
//   templateUrl: 'Groupcd.component.html',
// })
// export class DialogGroupEdit {
//   data: any;
//   popup: any;
//   constructor(
//     public dialogRef: MatDialogRef<DialogGroupEdit>, public dialogser: GenericService) {
//     this.data = this.dialogser.data;
//     this.popup = "Edit";
//   }
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }