import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BinanceService } from './binance.service';

@Component({
  selector: 'cp-trading-pair-selector',
  template: `
    @if (tradingPairs(); as tradingPairs) {
      <select>
        @for (pair of tradingPairs; track pair.symbol) {
          <option [value]="pair.symbol">
            {{ pair.symbol }}
          </option>
        }
      </select>
    } @else {
      <div>Trading pairs are loading...</div>
    }
  `,
  styles: `
    :host {
      display: contents;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradingPairSelectorComponent {
  readonly #binanceService = inject(BinanceService);

  tradingPairs = toSignal(this.#binanceService.getTradingPairs());
}
