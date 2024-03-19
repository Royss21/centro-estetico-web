import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, Subject, debounceTime, map, switchMap, takeUntil } from 'rxjs';
import { SharedModule } from '@shared/shared.module';
import { UntypedFormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'order-paged',
  standalone: true,
  templateUrl: './paged.component.html',
  styleUrls: ['./paged.component.scss'],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatIconModule
  ],

})
export class PagedOrderComponent implements OnInit {

  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  isLoading: boolean = false;
  searchInputControl: UntypedFormControl = new UntypedFormControl();

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  ngOnInit(): void {

    this.searchInputControl.valueChanges
    .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        switchMap((query) => {
            //this.closeDetails();
            this.isLoading = true;
            return [];
            //return this._inventoryService.getProducts(0, 10, 'name', 'asc', query);
        }),
        map(() => {
            this.isLoading = false;
        })
    )
    .subscribe();

  }

}
