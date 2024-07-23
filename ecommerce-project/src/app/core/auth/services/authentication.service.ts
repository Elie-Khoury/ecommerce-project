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

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  LOGIN_API: string = env.AUTH_API + "User/Login()";
  REG_USER_API: string = env.AUTH_API + "User/SignUp()";
  REG_ADMIN_API: string = env.AUTH_API + "User/CreateAdminUser()";

  user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  private tokenExpirationTimer: any;

  private handleCreateUser(res: ILoginResponse) {
    const decodedToken = jwtDecode(res.Login.AccessToken);
    const expiresTimeStamp = new Date().getTime() + (decodedToken.exp ? decodedToken.exp * 1000 : 0);
    const expiresIn = new Date(expiresTimeStamp);
    const user = new User(res.Login.AccessToken, expiresIn);
    this.user.next(user);
    this.autoLogout(decodedToken.exp ? decodedToken.exp * 1000 : 0);

    localStorage.setItem('user', JSON.stringify(user));
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
    console.log("Reached Auth-Service");

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
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userString = localStorage.getItem('user');

      if (!userString) {
        return;
      }

      const user = JSON.parse(userString);

      const loggedInUser = new User(user._token, user._expiresIn);

      if (loggedInUser.token) {
        this.user.next(loggedInUser);

        const expirationTime = user._expiresIn.getTime() - new Date().getTime();
        this.autoLogout(expirationTime);
      }
    }
  }

  autoLogout(expirationTime: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationTime)
  }
}
