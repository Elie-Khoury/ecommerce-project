import { Component, EventEmitter, Input, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { IProduct } from '../../models/Product.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {

  @Output() formValueChanged = new EventEmitter<any>();

  @Input() products!: IProduct[];
  @Input() categories!: string[];

  maxPrice!: number;

  readonly panelOpenState = signal(false);

  productForm: FormGroup = this.fb.group({
    sortBy: [''],
    price: [''],
    category: this.fb.array([])
  });

  constructor(private fb: FormBuilder) { }

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products'] && changes['products'].currentValue) {
      this.maxPrice = Math.ceil(Math.max(...this.products.map(item => item.price)));
    }
  }

  ngOnInit(): void {

    this.productForm.valueChanges.subscribe(value => {
      this.formValueChanged.emit(value);
    });
  }
}
