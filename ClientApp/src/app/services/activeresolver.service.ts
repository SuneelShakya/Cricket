import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { MatDialogRef, MatDialog } from '@angular/material';

export class ActiveResolver implements Resolve<any> {
  constructor(private http: HttpClient, public dialog: MatDialog,  @Inject('BASE_URL') public AppUrl: string, public router: Router) { }
  resolve(_route: ActivatedRouteSnapshot, _rstate: RouterStateSnapshot) {
    this.dialog.closeAll();
    this.IsActive().subscribe(status => {
      if (status === 'InActive') {
        this.router.navigateByUrl('/login');
      }
    },
    () => {
      this.router.navigateByUrl('/login');
    });
    return 'ss';
  }

  IsActive() {
    const http = this.http;
    const url = this.AppUrl + 'Shared/IsActive';
    return http.get(url).pipe();
  }
}
@Injectable()
export class canActivateGroup implements CanActivate {
  
  constructor(private _sharedService: SharedService,
    public dialog: MatDialog) {}
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ) {
    let group = route.data.group;
    var toShow = false;
    this._sharedService.currentGroup.subscribe(totalGroup => {
      var totalGroups: any = totalGroup[0];
      if (totalGroups[group] === true) {
        toShow = true;
      } else {
        toShow = false;
      }
    });
    return toShow;
  }
}