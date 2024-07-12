import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegUserService {

  constructor(private http: HttpClient) { }

  registerUser(data: any) {

    const header = new HttpHeaders({
      contentType: 'application/json',
    })

    const response = this.http.post('https://fakestoreapi.com/users', data, { headers: header }).subscribe((data) => {
      console.log("Data:")
      console.log(data)
    });

    console.log("Response:")
    console.log(response)
  }
}
