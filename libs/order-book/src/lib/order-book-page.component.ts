import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OrderBookCardComponent } from './components/order-book-card.component';
import { TradingPairSelectorComponent } from './components/trading-pair-selector.component';
import { OrderBookStore } from './order-book.store';

@Component({
  template: `
    <h2 class="mb-4 text-xl font-bold">Order Book</h2>
    <div class="mb-4">
      <bp-trading-pair-selector
        [tradingPairs]="tradingPairs()"
        [tradingPairsLoading]="tradingPairsLoading()"
        (pairSelected)="addOrderBookSymbol($event)"
      />
    </div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      @for (symbol of orderBookSymbols(); track symbol) {
        <bp-order-book-card
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
  tradingPairsLoading = this.#orderBookStore.tradingPairsLoading;

  addOrderBookSymbol(symbol: string) {
    this.#orderBookStore.addOrderBookSymbol(symbol);
  }

  removeOrderBookSymbol(symbol: string) {
    this.#orderBookStore.removeOrderBookSymbol(symbol);
  }
}
