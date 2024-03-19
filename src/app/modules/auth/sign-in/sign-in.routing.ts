import { Routes } from '@angular/router';
import { AuthSignInComponent } from './sign-in.component';

export default [
  {
    path: '',
    component: AuthSignInComponent
    //loadComponent: () => import('./sign-in.component').then(m => m.AuthSignInComponent)
  }
] as Routes;
