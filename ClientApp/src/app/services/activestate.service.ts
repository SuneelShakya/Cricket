import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ActiveInterceptor implements HttpInterceptor {
  constructor(public router: Router) {  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (this.router.url.toLocaleLowerCase().includes('logout') || (this.router.url == '/') || this.router.url.toLocaleLowerCase().includes('login')) {//req.url.toLocaleUpperCase().includes('logout')
          // document.getElementById('chatWindow').style.display = 'none';
        }
        else{
          // document.getElementById('chatWindow').style.display = 'block';
        }
        if (event instanceof HttpResponse && event.body === 'Session out.') {
          // document.getElementById('chatWindow').style.display='none';
          this.router.navigateByUrl('/login');
        }
        if (event instanceof HttpResponse && event.status === 500) {
          // document.getElementById('chatWindow').style.display = 'none';
          console.log('interceptors are working!!');
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}