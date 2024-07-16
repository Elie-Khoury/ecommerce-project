import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { env } from "../../../../../envs/env.dev"
import { ILoginRequest } from '../models/LoginRequest';
import { ILoginResponse } from '../models/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  constructor(private http: HttpClient) { }

  loginAPI = env.AUTH_API + "/User/Login()";

  loginUser(data: ILoginRequest) {

    const header = new HttpHeaders({
      contentType: 'application/json',
    })

    const response = this.http.post<ILoginResponse>(this.loginAPI, data, { headers: header }).subscribe((data) => {
      console.log("Data:");
      console.log(JSON.stringify(data));
    });

    console.log("Response:")
    console.log(response)
  }
}
