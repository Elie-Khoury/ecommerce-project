import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('token') !== null) {
      const headers = new HttpHeaders({
        'JWT': (localStorage.getItem('token') ?? "")
      });

      const clone = req.clone({
        headers: headers
      });

      return next.handle(clone)
    }
    else {
      return next.handle(req)
    }
  }
}
