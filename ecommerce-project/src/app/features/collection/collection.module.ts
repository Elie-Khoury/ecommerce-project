import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { FilterComponent } from './components/filter/filter.component';
import { CollectionComponent } from './collection.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './components/products/products.component';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ProductsSwiperComponent } from '../../shared/components/products-swiper/products-swiper.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        CollectionComponent,
        FilterComponent,
        ProductsComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        SharedModule,
        ProductsSwiperComponent,
        ReactiveFormsModule,
        MatIconModule,
        MatSliderModule,
        MatExpansionModule
    ],
    exports: [
    ],
})
export class CollectionModule { }
