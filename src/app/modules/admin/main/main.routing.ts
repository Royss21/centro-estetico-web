import { Routes } from '@angular/router';

export default  [
  {
    path: '',
    loadComponent: () => import('./main.component').then(m => m.MainComponent)
  }
] as Routes;
