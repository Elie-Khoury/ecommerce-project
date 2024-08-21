import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuthActions from '../../core/auth/state/actions/auth.actions';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  constructor(private store: Store) { }

  onLogout() {
    this.store.dispatch(fromAuthActions.logout());
  }
}
