import { Component, Input, OnInit } from '@angular/core';
import { IImageUrls } from './models/imgUrls';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  @Input() navDark!: boolean;

  imgUrls!: IImageUrls;

  constructor() { }

  ngOnInit(): void {
    this.imgUrls = {
      logoUrl: this.navDark ? 'assets/logo-dark.svg' : 'assets/logo-light.svg',
      dotUrl: this.navDark ? 'https://img.icons8.com/?size=100&id=79003&format=png&color=212322' : 'https://img.icons8.com/?size=100&id=79003&format=png&color=fafafa',
      searchUrl: this.navDark ? 'https://img.icons8.com/?size=100&id=7695&format=png&color=212322' : 'https://img.icons8.com/?size=100&id=7695&format=png&color=fafafa',
      cartUrl: this.navDark ? 'https://img.icons8.com/?size=100&id=22167&format=png&color=212322' : 'https://img.icons8.com/?size=100&id=22167&format=png&color=fafafa',
      profileUrl: this.navDark ? 'https://img.icons8.com/?size=100&id=15265&format=png&color=212322' : 'https://img.icons8.com/?size=100&id=15265&format=png&color=fafafa',
    }
  }
}
