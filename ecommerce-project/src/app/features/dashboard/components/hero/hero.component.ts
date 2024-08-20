import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../../core/auth/models/User.model';
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

  imgUrls!: { id: number, title: string, titleColor: string, url: string, alt: string }[];
  arrImgUrl!: string;
  sizeBgUrl!: string;
  mobileHeroImg!: string;

  constructor(private store: Store<AuthState>) {
    this.user$ = this.store.select(selectUser);
  }

  navDark: boolean = true;

  identify(index: number, item: { id: number, title: string, titleColor: string, url: string, alt: string }) {
    return item.id;
  }

  ngOnInit(): void {
    this.imgUrls = [
      {
        id: 1,
        title: 'RETRO JORDANS',
        titleColor: '#55B1BF',
        url: 'assets/hero-shoe-blue.svg',
        alt: 'RETRO JORDANS BLUE'
      },
      {
        id: 2,
        title: 'RETRO JORDANS',
        titleColor: '#55B1BF',
        url: 'assets/hero-shoe-black.svg',
        alt: 'RETRO JORDANS BLACK'
      },
      {
        id: 3,
        title: 'RUNNING SHOES',
        titleColor: '#55B1BF',
        url: 'assets/hero-shoe-red.svg',
        alt: 'RUNNING SHOES'
      }
    ]

    this.arrImgUrl = 'assets/arrow-btn.svg';

    this.sizeBgUrl = 'assets/sizes-bg.svg';

    this.mobileHeroImg = 'assets/mobile-hero.svg';
  }
}
