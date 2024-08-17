import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { MatIconModule } from '@angular/material/icon';
import { FilterProductsPipe } from './components/searchbar/filters/filter-products.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDivider } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { IsNumberPipe } from './utils/pipes/is-number.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './components/snackbar/snackbar.component';


@NgModule({
  declarations: [
    SearchbarComponent,
    FilterProductsPipe,
    IsNumberPipe,
    SnackbarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    MatDivider,
    MatIconModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatListModule
  ],
  exports: [
    SearchbarComponent,
    IsNumberPipe
  ]
})
export class SharedModule { }
