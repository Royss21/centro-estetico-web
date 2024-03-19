import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SharedModule } from '@shared/shared.module';
import { ISaleDay } from '../../interfaces/sale-day.interface';
import { ISaleDayProduct } from '../../interfaces/sale-day-product.interface';

const data  =[
  {
      id: '1b6fd296-bc6a-4d45-bf4f-e45519a58cf5',
      productName: 'Helados de lucuma',
      quantity: 4,
      devolution: 0,
      quantitySold: 4,
      productPrice: 3.50,
      subtotal: 0
  },
  {
      id: '2dec6074-98bd-4623-9526-6480e4776569',
      productName: 'Sin Parar',
      quantity: 20,
      devolution: 0,
      quantitySold: 20,
      productPrice: 0.70,
      subtotal: 0
  }
];

@Component({
  selector: 'app-register-sale-day',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './sale-day.component.html',
  styleUrls: ['./sale-day.component.scss']
})
export class RegisterSaleDayComponent implements OnInit {

  saleDayForm: UntypedFormGroup;
  recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild('recentTransactionsTable', {read: MatSort}) recentTransactionsTableMatSort: MatSort;
  recentTransactionsTableColumns: string[] = ['productName', 'quantity', 'devolution', 'quantitySold', 'subtotal'];

  constructor(
    private _formBuilder: FormBuilder
  ){
    this.saleDayForm = this._formBuilder.group({
      products: this._formBuilder.array([]),
      personalRoleId: [0]
    });
  }

  ngOnInit(): void {


    this.recentTransactionsDataSource.data = data;
  }

  ngAfterViewInit(): void
  {
    this.recentTransactionsDataSource.sort = this.recentTransactionsTableMatSort;
  }

  trackByFn(index: number, item: any): any
  {
    return item.id || index;
  }

}
