// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })

export class AuthInterceptorService implements HttpInterceptor {

  // constructor(private router: Router) { }

  // handleError(error: any) {

  //   if (error.status == 401) {
  //     console.log("Something went wrong. Please try again.");
  //     this.router.navigateByUrl('/login');
  //   }
  //   else if (error.status == 404) {
  //     console.log("Page not found.");
  //     this.router.navigateByUrl('/home');
  //   }

  //   return throwError(() => new Error('An error occurred'));
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('token') !== null) {
      const headers = new HttpHeaders({
        'JWT': (localStorage.getItem('token') ?? "")
      });

      const clone = req.clone({
        headers: headers
      });

      return next.handle(clone)
      // .pipe(
      //   catchError(this.handleError)
      // );
    }
    else {
      return next.handle(req)
      // .pipe(
      //   catchError(this.handleError)
      // );
    }
  }
}
