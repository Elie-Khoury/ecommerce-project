import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../../shared/models/product';
import { SearchbarService } from '../../../../shared/components/searchbar/services/searchbar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products!: IProduct[];

  constructor(private searchService: SearchbarService) { }

  ngOnInit(): void {
    this.searchService.getProducts().subscribe((products) => {
      this.products = products;
    })
  }
}
