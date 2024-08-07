import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  toDisplay: string | number = 7;

  electronicsBgImg: string = 'assets/electronics-bg.jpg';
  jewelryBgImg: string = 'assets/jewelry-bg.jpg';
  clothingBgImg: string = 'assets/clothing-bg.jpg';


  constructor() { }
}
