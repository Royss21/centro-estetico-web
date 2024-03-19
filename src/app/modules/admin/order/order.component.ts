import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '@layout/layout.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LayoutComponent
  ],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

}
