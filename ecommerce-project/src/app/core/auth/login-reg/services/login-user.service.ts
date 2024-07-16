import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { env } from "../../../../../envs/env.dev"
import { ILoginRequest } from '../models/LoginRequest';
import { ILoginResponse } from '../models/LoginResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  constructor(private http: HttpClient) { }

  loginAPI = env.AUTH_API + "User/Login()";

  loginUser(data: ILoginRequest): Observable<ILoginResponse> {

    const header = new HttpHeaders({
      contentType: 'application/json',
    })

    return this.http.post<ILoginResponse>(this.loginAPI, data, { headers: header });

  }
}
