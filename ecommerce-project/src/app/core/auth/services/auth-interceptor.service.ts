import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('token') !== null) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}` ?? ""
      });

      const clone = req.clone({
        headers: headers
      });

      return next.handle(clone);
    }
    else {
      return next.handle(req);
    }
  }
}
