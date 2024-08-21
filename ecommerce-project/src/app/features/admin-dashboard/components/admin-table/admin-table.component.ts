import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { IProduct } from '../../../products/models/Product.model';
import { ProductsService } from '../../../products/services/products.service';

@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.scss'
})
export class AdminTableComponent {

  productsSubscription!: Subscription;

  rowData!: IProduct[];

  colDefs: ColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "title", headerName: "Product" },
    { field: "category", headerName: "Category" },
    {
      field: "price", headerName: "Price",
      cellRenderer: (params: any) => {
        return `$${params.data.price}`;
      }
    },
    {
      field: "rating", headerName: "Rating",
      cellRenderer: (params: any) => {
        return `${params.data.rating.rate} (${params.data.rating.count})`;
      }
    }
  ];

  defaultColDef: ColDef = {
    flex: 1,
    filter: true
  }

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productsSubscription = this.productsService.getProducts().subscribe((products) => {
      this.rowData = products;
    })
  }
}
