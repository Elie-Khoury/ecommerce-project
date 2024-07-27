import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthState } from '../../core/auth/state/reducers/auth.reducer';
import { Store } from '@ngrx/store';
import { selectUser } from '../../core/auth/state/selectors/auth.selectors';
import { User } from '../../core/auth/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  user$: Observable<User | null>;

  constructor(private store: Store<AuthState>) {
    this.user$ = this.store.select(selectUser);
  }

  navDark: boolean = true;

}
