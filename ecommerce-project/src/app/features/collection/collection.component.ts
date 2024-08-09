import { Component, OnInit } from '@angular/core';
import { SearchbarService } from '../../shared/components/searchbar/services/searchbar.service';
import { IProduct } from '../../shared/models/product';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class CollectionComponent implements OnInit {

  navDark!: boolean;

  products!: IProduct[];
  toDisplay: string | number = "jewelery";

  constructor(private searchService: SearchbarService) { }

  ngOnInit(): void {

    this.navDark = true;

    this.searchService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
