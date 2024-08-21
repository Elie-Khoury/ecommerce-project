import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions'
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthenticationService } from '../../services/authentication.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { LoginRegComponent } from '../../login-reg/login-reg.component';
import { User } from '../../models/User.model';


@Injectable()
export class AuthEffects {

    autologin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.autologin),
            mergeMap(() => {
                const userString = localStorage.getItem('user');

                if (userString) {
                    const user = JSON.parse(userString) as User;
                    const isTokenExpired = new Date() < user.expiresIn;

                    if (!isTokenExpired) {
                        return of(AuthActions.loginSuccess({ user }));
                    }
                    else {
                        return of(AuthActions.loginFailure());
                    }
                }
                return of(AuthActions.loginFailure());
            }),
            catchError(() => of(AuthActions.loginFailure()))
        )
    );

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            mergeMap((action) =>
                this.authService.login(action.req).pipe(
                    map((res) => {
                        const decodedToken = jwtDecode(res.Login.AccessToken);
                        //@ts-ignore
                        const expiresTimeStamp = new Date().getTime() + (decodedToken.exp * 1000);
                        const expiresIn = new Date(expiresTimeStamp);

                        const user: User = {
                            token: res.Login.AccessToken,
                            refreshToken: res.Login.RefreshToken,
                            expiresIn: expiresIn,
                            //@ts-ignore
                            isAdmin: decodedToken.realm_access.roles.indexOf('Admin') > -1
                        };

                        localStorage.setItem('user', JSON.stringify(user));

                        return AuthActions.loginSuccess({ user });
                    })
                )
            )
        )
    );

    loginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap((e) => {
                if (e.user.isAdmin) {
                    this.router.navigate(['/admin']);
                }
                else {
                    this.router.navigate(['/home']);
                }
            })
        ),
        { dispatch: false }
    );

    signUp$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.signUp),
                mergeMap((action) => {
                    const register$ = action.req.RoleName?.toLowerCase() == 'admin' ?
                        this.authService.registerAdmin(action.req) :
                        this.authService.registerUser(action.req);

                    return register$.pipe(
                        map(() => AuthActions.signUpSuccess()),
                        catchError((error) => of(AuthActions.signUpFailure({ error })))
                    )
                }
                )
            )
    );

    signUpSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.signUpSuccess),
            tap(() => {
                window.alert('You have successfully signed up!');
            })
        ),
        { dispatch: false }
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(() => {
                localStorage.removeItem('user');
                this.router.navigateByUrl('/login');
            }
            )
        ),
        { dispatch: false }
    );

    autologout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.autologout)
        )
    );

    refreshToken$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.refreshToken),
            mergeMap((action) =>
                this.authService.refreshToken(action.refreshToken).pipe(
                    map((res) => {
                        const decodedToken = jwtDecode(res.AccessToken);
                        //@ts-ignore
                        const expiresTimeStamp = new Date().getTime() + (decodedToken.exp * 1000);
                        const expiresIn = new Date(expiresTimeStamp);

                        const user: User = {
                            token: res.AccessToken,
                            refreshToken: res.RefreshToken,
                            expiresIn: expiresIn,
                            //@ts-ignore
                            isAdmin: decodedToken.realm_access.roles.indexOf('Admin') > -1
                        };

                        localStorage.setItem('user', JSON.stringify(user));

                        return AuthActions.refreshTokenSuccess({ user });
                    })
                )
            ))
    );

    constructor(
        private actions$: Actions,
        private authService: AuthenticationService,
        private router: Router
    ) { }

}
