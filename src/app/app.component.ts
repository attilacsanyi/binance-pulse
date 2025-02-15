import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'cp-root',
  template: `
    <div class="min-h-screen bg-gray-100">
      <header class="bg-white shadow-sm">
        <div class="mx-auto max-w-7xl px-4 py-4">
          <h1 class="text-2xl font-bold text-gray-900">{{ title }}</h1>
        </div>
      </header>
      <main class="mx-auto max-w-7xl px-4 py-6">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppComponent {
  title = 'Binance Pulse';
}
