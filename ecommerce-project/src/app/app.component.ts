import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './core/auth/services/authentication.service';
import { Store } from '@ngrx/store';
import * as fromAuthActions from './core/auth/state/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ecommerce-project';

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(fromAuthActions.autologin());
  }
}
