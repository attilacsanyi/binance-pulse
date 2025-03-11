import { Route } from '@angular/router';

export const orderBookRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./components/order-book-home.component'),
  },
];
