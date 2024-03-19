import { Routes } from '@angular/router';
import { PagedOrderComponent } from './pages/paged/paged.component';
import { CreateOrderComponent } from './pages/create/create.component';
import { OrderComponent } from './order.component';
import { RegisterSaleDayComponent } from './pages/sale-day/sale-day.component';

export default  [
  {
    path: '',
    component: OrderComponent,
    children:[
      {
        path         : '',
        component    : PagedOrderComponent,
      },
      {
        path         : 'create',
        component    : CreateOrderComponent,
      },
      {
        path         : 'register-sale-day',
        component    : RegisterSaleDayComponent,
      }
    ]
  }
] as Routes;
