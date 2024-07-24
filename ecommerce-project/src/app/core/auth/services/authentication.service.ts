import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../../envs/env.dev';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ILoginRequest } from '../models/LoginRequest';
import { ILoginResponse } from '../models/LoginResponse';
import { ISignUpRequest } from '../models/SignUpRequest';
import { ISignUpResponse } from '../models/SignUpResponse';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { IRefreshResponse } from '../models/RefreshResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  LOGIN_API: string = env.AUTH_API + "User/Login()";
  REG_USER_API: string = env.AUTH_API + "User/SignUp()";
  REG_ADMIN_API: string = env.AUTH_API + "User/CreateAdminUser()";
  REFRESH_API: string = env.AUTH_API + "User/RefreshToken()";

  $user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  $refreshToken: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  private tokenExpirationTimer: any;

  private handleCreateUser(res: ILoginResponse) {

    console.log("handleCreateUser Starts");

    console.log(res);

    this.$refreshToken.next(res.Login.RefreshToken);

    console.log("refresh token next");

    const decodedToken = jwtDecode(res.Login.AccessToken);
    const expiresTimeStamp = new Date().getTime() + (decodedToken.exp ? decodedToken.exp * 1000 : 0);
    const expiresIn = new Date(expiresTimeStamp);
    const user = new User(res.Login.AccessToken, res.Login.RefreshToken, expiresIn);
    this.$user.next(user);

    console.log("autologout called");

    this.autoLogout(decodedToken.exp ? decodedToken.exp * 1000 : 0);

    localStorage.setItem('user', JSON.stringify(user));
  }

  private refreshToken() {

    console.log("Refresh Token Starts");

    this.tokenExpirationTimer = null;

    const header = new HttpHeaders({
      contentType: 'application/json',
    })

    console.log(this.$refreshToken.value);

    return this.http.post<IRefreshResponse>
      (
        this.REFRESH_API, { "RefreshToken": this.$refreshToken.value }, { headers: header }
      )
      .pipe(
        tap((res) => {

          console.log("handleCreateUser called");

          console.log(res);

          this.handleCreateUser({ Login: res })
        }));
  }

  registerUser(data: ISignUpRequest): Observable<ISignUpResponse> {
    const header = new HttpHeaders({
      contentType: 'application/json',
    })
    return this.http.post<ISignUpResponse>
      (
        this.REG_USER_API, data, { headers: header }
      );
  }

  registerAdmin(data: ISignUpRequest): Observable<ISignUpResponse> {
    const header = new HttpHeaders({
      contentType: 'application/json',
    })
    return this.http.post<ISignUpResponse>
      (
        this.REG_ADMIN_API, data, { headers: header }
      );
  }

  login(data: ILoginRequest): Observable<ILoginResponse> {

    const header = new HttpHeaders({
      contentType: 'application/json',
    })
    return this.http.post<ILoginResponse>
      (
        this.LOGIN_API, data, { headers: header }
      )
      .pipe(
        tap((res) => {
          this.handleCreateUser(res)
        }));
  }

  logout() {
    this.$user.next(null);
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {

    console.log("AutoLogin Starts");

    if (typeof window !== 'undefined' && window.localStorage) {
      const userString = localStorage.getItem('user');

      if (!userString) {
        return;
      }

      const user = JSON.parse(userString);

      const loggedInUser = new User(user._token as string, user._refreshToken as string, new Date(user._expiresIn));

      if (loggedInUser.token) {
        this.$user.next(loggedInUser);
        this.$refreshToken.next(loggedInUser.refreshToken);

        const expirationTime = loggedInUser.expiresIn.getTime() - new Date().getTime();

        console.log("AutoLogout called");


        this.autoLogout(expirationTime);
      }
    }
  }

  autoLogout(expirationTime: number) {

    console.log("AutoLogout Starts");

    this.tokenExpirationTimer = setTimeout(() => {

      this.refreshToken().subscribe(
        {
          error: () => { this.logout }
        }
      )


    }, 3000)
  }
}
