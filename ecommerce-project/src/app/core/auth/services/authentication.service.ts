import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../../envs/env.dev';
import { Observable, Subject, tap } from 'rxjs';
import { ILoginRequest } from '../models/LoginRequest';
import { ILoginResponse } from '../models/LoginResponse';
import { ISignUpRequest } from '../models/SignUpRequest';
import { ISignUpResponse } from '../models/SignUpResponse';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  LOGIN_API: string = env.AUTH_API + "User/Login()";
  REG_API: string = env.AUTH_API + "User/SignUp()";

  user: Subject<User> = new Subject<User>();

  private handleCreateUser(res: ILoginResponse) {
    const expiresTimeStamp = new Date().getTime() + (+res.Login.ExpiresIn * 1000);
    const expiresIn = new Date(expiresTimeStamp);
    const user = new User(res.Login.AccessToken, expiresIn);
    this.user.next(user)
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
}
