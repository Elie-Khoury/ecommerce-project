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

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  LOGIN_API: string = env.AUTH_API + "User/Login()";
  REG_API: string = env.AUTH_API + "User/SignUp()";

  user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  private tokenExpirationTimer: any;

  private handleCreateUser(res: ILoginResponse) {
    const expiresTimeStamp = new Date().getTime() + (+res.Login.ExpiresIn * 1000);
    const expiresIn = new Date(expiresTimeStamp);
    const user = new User(res.Login.AccessToken, expiresIn);
    this.user.next(user);
    // this.autoLogout((+res.Login.ExpiresIn * 1000));
  }

  registerUser(data: ISignUpRequest): Observable<ISignUpResponse> {
    const header = new HttpHeaders({
      contentType: 'application/json',
    })
    return this.http.post<ISignUpResponse>
      (
        this.REG_API, data, { headers: header }
      );
  }

  loginUser(data: ILoginRequest): Observable<ILoginResponse> {
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

  logoutUser() {
    this.user.next(null);
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');

      if (!token) {
        return;
      }

      const loggedInUser = new User(token, new Date());

      if (loggedInUser.token) {
        this.user.next(loggedInUser);
        // this.autoLogout(loggedInUser.expiresIn.getTime() - new Date().getTime());
      }
    }
  }

  // autoLogout(expireTime: number){
  //   setTimeout(() => {
  //     this.logoutUser();
  //   }, expireTime)
  // }
}
