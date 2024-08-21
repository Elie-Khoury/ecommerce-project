import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthState } from '../state/reducers/auth.reducer';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { selectUser } from '../state/selectors/auth.selectors';
import * as fromAuthActions from '../state/actions/auth.actions';

@Injectable()
export class AuthErrorInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
    private store: Store<AuthState>
  ) { }

  private isRefreshing = false;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true;
          this.handleRefreshToken();
          return this.store.select(selectUser).pipe(
            filter(user => user !== null),
            take(1),
            switchMap(user => {
              return next.handle(req.clone({ headers: new HttpHeaders({ 'Authorization': `Bearer ${user?.token}` ?? '' }) }));
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
