import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  navDark: boolean = true;

  rowData = [
    {
      "name": "Smartphone X",
      "description": "High-performance smartphone with advanced features",
      "price": 699.99,
      "category": "Electronics",
      "isAvailable": true
    },
    {
      "name": "Laptop Y",
      "description": "Thin and lightweight laptop for work and entertainment",
      "price": 1299.99,
      "category": "Electronics",
      "isAvailable": false
    },
    {
      "name": "Fitness Tracker Z",
      "description": "Wearable device to track fitness activities and health metrics",
      "price": 99.95,
      "category": "Fitness",
      "isAvailable": true
    },
    {
      "name": "Wireless Earbuds A",
      "description": "Bluetooth earbuds with noise-canceling technology",
      "price": 129.99,
      "category": "Electronics",
      "isAvailable": true
    },
    {
      "name": "Exercise Bike B",
      "description": "Indoor exercise bike with adjustable resistance levels",
      "price": 299.99,
      "category": "Fitness",
      "isAvailable": false
    }
  ]

  colDefs: ColDef[] = [
    { field: 'name' },
    { field: 'description', filter: true, editable: true },
    { field: 'In Stock', cellRenderer: StockBtnComponent },
    {
      field: 'price',
      valueFormatter: params => { return '$' + params.value.toLocaleString(); }
    },
    { field: 'category' },
    { field: 'isAvailable' },
  ]
  defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
  };
}
