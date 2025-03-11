import { Route } from '@angular/router';
import { HomeComponent } from './home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'order-book',
    loadChildren: () => import('@bp/order-book'),
  },
];
