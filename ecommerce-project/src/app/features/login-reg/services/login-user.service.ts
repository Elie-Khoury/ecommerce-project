import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  constructor(private http: HttpClient) { }

  loginUser(data: any) {

    const header = new HttpHeaders({
      contentType: 'application/json',
    })

    const response = this.http.post('https://fakestoreapi.com/auth/login', data, { headers: header }).subscribe((data) => {
      console.log("Data:")
      console.log(JSON.stringify(data))
    });

    console.log("Response:")
    console.log(response)
  }
}
