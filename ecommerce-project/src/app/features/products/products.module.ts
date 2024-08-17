import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { CollectionComponent } from './pages/collection/collection.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductsSwiperComponent } from './components/products-swiper/products-swiper.component';
import { FilterComponent } from './components/filter/filter.component';
import { ProductsComponent } from './components/products/products.component';
import { SortProductsPipe } from './utils/pipes/sort-products.pipe';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        CollectionComponent,
        ProductDetailsComponent,
        FilterComponent,
        ProductsComponent,
        ProductsSwiperComponent,
        ProductCardComponent,
        SortProductsPipe
    ],
    imports: [
        CommonModule,
        RouterModule,
        CoreModule,
        SharedModule,
        ReactiveFormsModule,
        MatIconModule,
        MatSliderModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        NgxSpinnerModule,
        BrowserAnimationsModule
    ],
    exports: [
        ProductDetailsComponent,
        ProductsSwiperComponent,
        SortProductsPipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ProductsModule { }