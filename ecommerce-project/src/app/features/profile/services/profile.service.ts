import { Injectable, signal } from '@angular/core';
import { IUserDetails } from '../models/UserDetails.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  userDetails = signal<IUserDetails>(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).userDetails || ({} as IUserDetails) : ({} as IUserDetails));

  constructor() { }

  getUserDetails(): IUserDetails {
    if (!JSON.parse(localStorage.getItem("user")!).userDetails) {
      let user = JSON.parse(localStorage.getItem("user")!);

      const accessToken = user.token;

      const decodedToken = jwtDecode(accessToken);

      this.userDetails.set({
        //@ts-ignore
        name: decodedToken.given_name,
        //@ts-ignore
        surname: decodedToken.family_name,
        //@ts-ignore
        email: decodedToken.preferred_username,
        phone: 'required*',
        address: 'required*',
        street: 'required*',
        building: 'required*',
        cardNum: 'required*',
        //@ts-ignore
        fullName: decodedToken.name
      })

      user = {
        ...user,
        userDetails: this.userDetails()
      }

      localStorage.setItem("user", JSON.stringify(user));

      return this.userDetails();
    }

    return this.userDetails();
  }

  updateUserDetails(userDetails: IUserDetails) {
    this.userDetails.set(userDetails);

    let user = JSON.parse(localStorage.getItem("user")!);

    user = {
      ...user,
      userDetails: this.userDetails()
    }

    localStorage.setItem("user", JSON.stringify(user));
  }
}