import { Route } from '@angular/router';

export const orderBookRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./order-book-page.component'),
  },
];
