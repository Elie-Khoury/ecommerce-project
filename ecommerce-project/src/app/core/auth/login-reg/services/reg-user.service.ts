import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from "../../../../../envs/env.dev"
import { ISignUpRequest } from '../models/SignUpRequest';
import { ISignUpResponse } from '../models/SignUpResponse';

@Injectable({
  providedIn: 'root'
})
export class RegUserService {

  constructor(private http: HttpClient) { }

  regAPI = env.AUTH_API + "/User/SignUp()";

  registerUser(data: ISignUpRequest) {

    const header = new HttpHeaders({
      contentType: 'application/json',
    })

    const response = this.http.post<ISignUpResponse>(this.regAPI, data, { headers: header }).subscribe((data) => {
      console.log("Data:")
      console.log(data)
    });

    console.log("Response:")
    console.log(response)
  }
}
