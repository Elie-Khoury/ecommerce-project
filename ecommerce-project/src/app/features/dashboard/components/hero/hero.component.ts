import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../../core/auth/models/user';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../core/auth/state/reducers/auth.reducer';
import { selectUser } from '../../../../core/auth/state/selectors/auth.selectors';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit {

  user$: Observable<User | null>;

  imgUrls!: { title: string, titleColor: string, url: string }[];
  arrImgUrl!: string;
  sizeBgUrl!: string;

  constructor(private store: Store<AuthState>) {
    this.user$ = this.store.select(selectUser);
  }

  navDark: boolean = true;

  ngOnInit(): void {
    this.imgUrls = [
      {
        title: 'RETRO JORDANS',
        titleColor: '#55B1BF',
        url: 'assets/hero-shoe-blue.svg',
      },
      {
        title: 'RETRO JORDANS',
        titleColor: '#55B1BF',
        url: 'assets/hero-shoe-black.svg',
      },
      {
        title: 'RUNNING SHOES',
        titleColor: '#55B1BF',
        url: 'assets/hero-shoe-red.svg',
      }
    ]

    this.arrImgUrl = 'assets/arrow-btn.svg';

    this.sizeBgUrl = 'assets/sizes-bg.svg';
  }
}
