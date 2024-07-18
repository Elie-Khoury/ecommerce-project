import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../envs/env.dev';
import { Observable } from 'rxjs';
import { ILoginRequest } from '../auth/login-reg/models/LoginRequest';
import { ILoginResponse } from '../auth/login-reg/models/LoginResponse';
import { ISignUpRequest } from '../auth/login-reg/models/SignUpRequest';
import { ISignUpResponse } from '../auth/login-reg/models/SignUpResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  LOGIN_API: string = env.AUTH_API + "User/Login()";
  REG_API: string = env.AUTH_API + "User/SignUp()";

  registerUser(data: ISignUpRequest): Observable<ISignUpResponse> {
    const header = new HttpHeaders({
      contentType: 'application/json',
    })
    return this.http.post<ISignUpResponse>(this.REG_API, data, { headers: header });
  }

  loginUser(data: ILoginRequest): Observable<ILoginResponse> {
    const header = new HttpHeaders({
      contentType: 'application/json',
    })
    return this.http.post<ILoginResponse>(this.LOGIN_API, data, { headers: header });
  }
}
