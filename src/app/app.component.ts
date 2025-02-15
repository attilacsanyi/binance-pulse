import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'cp-root',
  template: `
    <h1>{{ title }}</h1>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'Binance Pulse';
}
