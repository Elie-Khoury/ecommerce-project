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

  registerUser(data: ISignUpRequest): Observable<ISignUpResponse> {
    return this.http.post<ISignUpResponse>(this.REG_USER_API, data);
  }

  registerAdmin(data: ISignUpRequest): Observable<ISignUpResponse> {
    return this.http.post<ISignUpResponse>(this.REG_ADMIN_API, data);
  }

  login(req: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(this.LOGIN_API, req);
  }

  refreshToken(refreshToken: string | undefined): Observable<IRefreshResponse> {
    return this.http.post<IRefreshResponse>(this.REFRESH_API, { "RefreshToken": refreshToken });
  }
}
