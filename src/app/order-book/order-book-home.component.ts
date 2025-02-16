import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OrderBookCardComponent } from './order-book-card.component';
import { OrderBookStore } from './order-book.store';
import { TradingPairSelectorComponent } from './trading-pair-selector.component';

@Component({
  template: `
    <h2 class="text-xl font-bold text-gray-900">Order Book</h2>
    <cp-trading-pair-selector
      [tradingPairs]="tradingPairs()"
      (pairSelected)="addOrderBookSymbol($event)"
    />
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      @for (symbol of orderBookSymbols(); track symbol) {
        <cp-order-book-card
          [symbol]="symbol"
          (remove)="removeOrderBookSymbol($event)"
        />
      }
    </div>
  `,
  imports: [TradingPairSelectorComponent, OrderBookCardComponent],
  providers: [OrderBookStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrderBookHomeComponent {
  readonly #orderBookStore = inject(OrderBookStore);

  orderBookSymbols = this.#orderBookStore.orderBookSymbols;
  tradingPairs = this.#orderBookStore.sortedTradingPairs;

  addOrderBookSymbol(symbol: string) {
    this.#orderBookStore.addOrderBookSymbol(symbol);
  }

  removeOrderBookSymbol(symbol: string) {
    this.#orderBookStore.removeOrderBookSymbol(symbol);
  }
}
