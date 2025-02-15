import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TradingPairSelectorComponent } from '../trading-pair-selector.component';
import { OrderBookCardComponent } from './order-book-card.component';
import { OrderBookStoreService } from './order-book-store.service';

@Component({
  template: `
    <h2 class="text-xl font-bold text-gray-900">Order Book</h2>
    <cp-trading-pair-selector (symbolSelected)="addOrderBookSymbol($event)" />
    @for (symbol of orderBookSymbols(); track symbol) {
      <cp-order-book-card
        [symbol]="symbol"
        (remove)="removeOrderBookSymbol($event)"
      />
    }
  `,
  imports: [TradingPairSelectorComponent, OrderBookCardComponent],
  providers: [OrderBookStoreService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrderBookHomeComponent {
  readonly #orderBookStoreService = inject(OrderBookStoreService);

  orderBookSymbols = this.#orderBookStoreService.orderBookSymbols;

  addOrderBookSymbol(symbol: string) {
    this.#orderBookStoreService.addOrderBookSymbol(symbol);
  }

  removeOrderBookSymbol(symbol: string) {
    this.#orderBookStoreService.removeOrderBookSymbol(symbol);
  }
}
