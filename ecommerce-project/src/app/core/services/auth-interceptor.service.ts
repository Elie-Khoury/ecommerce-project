import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({ headers: req.headers.append('auth', 'abcxyz') });
    return next.handle(modifiedReq).pipe(tap((e) => {
      if (e.type === HttpEventType.Response) {
        if (e.status === 200) {
          console.log("Resposne Successful! Response data: ");
          console.log(e.body);
        }
      }
    }));
  }
}
