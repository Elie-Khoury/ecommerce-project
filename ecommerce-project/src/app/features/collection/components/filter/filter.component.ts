import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { SearchbarService } from '../../../../shared/components/searchbar/services/searchbar.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {

  categories = ['Electronics', 'Books', 'Clothing', 'Toys'];

  productForm: FormGroup = this.fb.group({
    name: [''],
    price: [''],
    category: this.fb.array([])
  });

  maxPrice!: number;

  readonly panelOpenState = signal(false);

  constructor(private fb: FormBuilder, private searchService: SearchbarService) { }

  onCheckboxChange(e: any) {
    const category: FormArray = <FormArray>this.productForm.get('category');

    if (e.target.checked) {
      category.push(this.fb.control(e.target.value));
    } else {
      const index = category.controls.findIndex(x => x.value === e.target.value);
      category.removeAt(index);
    }
  }

  ngOnInit(): void {
    this.searchService.getProducts().subscribe((products) => {
      this.maxPrice = Math.max(...products.map(item => item.price));
      this.maxPrice = Math.ceil(this.maxPrice);
    });
  }
}
