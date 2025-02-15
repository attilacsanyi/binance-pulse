import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderBookComponent } from './order-book/order-book.component';
import { TradingPairSelectorComponent } from './trading-pair-selector.component';

@Component({
  imports: [RouterModule, TradingPairSelectorComponent, OrderBookComponent],
  selector: 'cp-root',
  template: `
    <div class="min-h-screen bg-gray-100">
      <header class="bg-white shadow-sm">
        <div class="mx-auto max-w-7xl px-4 py-4">
          <h1 class="text-2xl font-bold text-gray-900">{{ title }}</h1>
        </div>
      </header>
      <main class="mx-auto max-w-7xl px-4 py-6">
        <cp-trading-pair-selector />
        <cp-order-book symbol="soleth" />
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppComponent {
  title = 'Binance Pulse';
}
