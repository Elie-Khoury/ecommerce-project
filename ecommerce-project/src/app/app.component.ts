import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './core/auth/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ecommerce-project';

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
