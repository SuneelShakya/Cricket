import { Component } from '@angular/core';
import { GenericService } from '../services/Generic.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  time: any;
  inspectorread: any;
  inspectorwrite: any;
  inspectordelete: any;
  componentread: any;
  componentwrite: any;
  componentdelete: any;
  profileread: any;
  profilewrite: any;
  profiledelete: any;
  workflowread: any;
  workflowwrite: any;
  workflowdelete: any;
  user: string;
  timezone: string;
  constructor(
    public _objService: GenericService) {
    let index1 = this._objService.TimeZones.findIndex((record: any) => record.selected == true);
    _objService.timezone = this._objService.TimeZones[index1].value;
    this._objService.time = this._objService.TimeZones[index1].name;
  }

  ngOnInit() {
   this._objService.componentread = localStorage.getItem("componentread")
   this._objService.componentwrite = localStorage.getItem("componentwrite")
   this._objService.componentdelete = localStorage.getItem("componentdelete")
   this._objService.inspectorread = localStorage.getItem("inspectorread")
   this._objService.inspectorwrite = localStorage.getItem("inspectorwrite")
   this._objService.inspectordelete = localStorage.getItem("inspectordelete")
   this._objService.profileread = localStorage.getItem("profileread")
   this._objService.profilewrite = localStorage.getItem("profilewrite")
   this._objService.profiledelete = localStorage.getItem("profiledelete")
   this._objService.workflowread = localStorage.getItem("workflowread")
   this._objService.workflowwrite = localStorage.getItem("workflowwrite")
   this._objService.workflowdelete = localStorage.getItem("workflowdelete")
   this._objService.transactionread = localStorage.getItem("transactionread")
   this._objService.transactionwrite = localStorage.getItem("transactionwrite")
   this._objService.transactiondelete = localStorage.getItem("transactiondelete")
   this.selecttimezone();

  };
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  SetTimeZone(obj) {
    this.user =localStorage.getItem("user");
    this._objService.timezone = obj.value;
    localStorage.setItem("timezone",obj.value);

    let index1 = this._objService.TimeZones.findIndex((record: any) => record.value == obj.value);
    this._objService.time = this._objService.TimeZones[index1].name;
    this._objService.savetimezone(this.user,obj.value).subscribe((datas: any) => {
      
    });
    
  }

  selecttimezone(){
    this.timezone =localStorage.getItem("timezone");
    let index1 = this._objService.TimeZones.findIndex((record: any) => record.value == this.timezone);
    this._objService.time = this._objService.TimeZones[index1].name;
    this._objService.timezone = this.timezone;
    

    
  }

  

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "demo") {
      x.className += " responsive";
    } else {
      x.className = "demo";
    }
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";

  }

}
