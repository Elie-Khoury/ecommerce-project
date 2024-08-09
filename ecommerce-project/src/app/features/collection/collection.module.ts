import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { FilterComponent } from './components/filter/filter.component';
import { CollectionComponent } from './collection.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './components/products/products.component';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
    declarations: [
        CollectionComponent,
        FilterComponent,
        ProductsComponent
    ],
    imports: [
        CoreModule,
        ReactiveFormsModule,
        MatSliderModule,
        MatExpansionModule
    ],
    exports: [
    ],
})
export class CollectionModule { }
