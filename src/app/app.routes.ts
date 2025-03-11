import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./order-book/order-book-home.component'),
  },
  {
    path: 'order-book',
    loadChildren: () => import('@bp/order-book'),
  },
];
