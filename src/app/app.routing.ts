import { Route } from '@angular/router';
import { HomeComponent } from '@modules/landing/pages/home/home.component';
import { Error404Component } from '@shared/pages/error/error404.component';

export const appRoutes: Route[] = [

  { path: '', pathMatch: 'full', redirectTo: '' },
  // { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'main' },
  // {
  //   path: '',
  //   loadComponent: () => import('@layout/layout.component').then(m => m.LayoutComponent),
  //   data: {
  //     layout: 'empty'
  //   },
  //   children: [
  //     {
  //       path: 'sign-in',
  //       loadChildren: () => import('@modules/auth/sign-in/sign-in.routing'),
  //     }
  //   ]
  // },

  {
    path: '',
    loadComponent: () => import('@layout/layout.component').then(m => m.LayoutComponent),
    children: [
      // {
      //   path: '',
      //   loadChildren: () => import('@modules/admin/main/main.routing'),
      // },
      {
        path         : '',
        component    : HomeComponent,
      },
      {
        path: 'order',
        loadChildren: () => import('./modules/admin/order/order.routing'),
      },
      {
        path: '404-not-found',
        pathMatch: 'full',
        component: Error404Component
      },
      { path: '**', redirectTo: '404-not-found' }
    ]
  },

];
