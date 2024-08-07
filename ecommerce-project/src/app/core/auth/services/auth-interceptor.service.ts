import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, filter, from, Observable, switchMap, take, tap, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../state/reducers/auth.reducer';
import * as fromAuthActions from '../state/actions/auth.actions';
import { selectUser } from '../state/selectors/auth.selectors';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
    private store: Store<AuthState>
  ) { }

  private isRefreshing = false;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // if (localStorage.getItem('token') !== null) {
    //   const headers = new HttpHeaders({
    //     'JWT': (localStorage.getItem('token') ?? "")
    //   });

    //   const clone = req.clone({
    //     headers: headers
    //   });

    //   return next.handle(clone).pipe(
    //     catchError(err => this.handleError(err))
    //   );
    // }
    // else {
    //   return next.handle(req).pipe(
    //     catchError(err => this.handleError(err))
    //   );
    // }


    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true;
          this.handleRefreshToken();
          return this.store.select(selectUser).pipe(
            filter(user => user !== null),
            take(1),
            switchMap(user => {
              return next.handle(req.clone({ headers: new HttpHeaders({ 'Authorization': user?.token ?? '' }) }));
            }),
            catchError(err => {
              this.isRefreshing = false;
              this.router.navigateByUrl('/login');
              return throwError(() => new Error(err));
            })
          )
        }
        else {
          return throwError(() => new Error(err))
        }
      })
    )
  }

  handleRefreshToken() {

    let refreshToken: string | undefined;

    const user = this.store.select(selectUser).subscribe(user => {
      refreshToken = user?.refreshToken;
    });
    user.unsubscribe();

    this.store.dispatch(fromAuthActions.refreshToken({ refreshToken }));
  }


}
