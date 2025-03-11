import { Route } from '@angular/router';
import { HomePageComponent } from './home-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'order-book',
    loadChildren: () => import('@bp/order-book'),
  },
];
