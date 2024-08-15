import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { SearchbarService } from '../../../../shared/components/searchbar/services/searchbar.service';
import { ProductsService } from '../../../products/services/products.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {

  @Output() formValueChanged = new EventEmitter<any>();

  categories!: string[];

  productForm: FormGroup = this.fb.group({
    sortBy: [''],
    price: [''],
    category: this.fb.array([])
  });

  maxPrice!: number;

  readonly panelOpenState = signal(false);

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService
  ) { }

  onCheckboxChange(e: any) {
    const category: FormArray = <FormArray>this.productForm.get('category');

    if (e.target.checked) {
      category.push(this.fb.control(e.target.value));
    } else {
      const index = category.controls.findIndex(x => x.value === e.target.value);
      category.removeAt(index);
    }

    if (category.value.length > 0 && this.productForm.value.sortBy !== 'category') {
      this.productForm.patchValue({
        sortBy: 'category'
      })
    }
  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((products) => {
      this.maxPrice = Math.max(...products.map(item => item.price));
      this.maxPrice = Math.ceil(this.maxPrice);
    });

    this.productsService.getCategories().subscribe((categories) => {
      this.categories = categories;
    })

    this.productForm.valueChanges.subscribe(value => {
      this.formValueChanged.emit(value);
    });
  }
}
