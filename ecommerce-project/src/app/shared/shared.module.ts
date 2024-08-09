import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { MatIconModule } from '@angular/material/icon';
import { FilterProductsPipe } from './components/searchbar/filters/filter-products.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDivider } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    SearchbarComponent,
    FilterProductsPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    MatDivider,
    MatIconModule,
    ReactiveFormsModule,
    MatListModule
  ],
  exports: [
    SearchbarComponent
  ]
})
export class SharedModule { }
