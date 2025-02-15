import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BinanceService } from './binance.service';

@Component({
  selector: 'cp-trading-pair-selector',
  template: `
    @if (tradingPairs(); as tradingPairs) {
      <select
        [value]="selectedTradingPair()"
        (change)="addTradingPair($event)"
      >
        <option [value]="">Please add a pair</option>
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
  symbolSelected = output<string>();

  readonly #binanceService = inject(BinanceService);

  tradingPairs = toSignal(this.#binanceService.getTradingPairs());
  selectedTradingPair = signal<string | undefined>(undefined);

  addTradingPair(event: Event) {
    const target = event.target as HTMLSelectElement;
    const tradingPairToAdd = target.value;
    this.selectedTradingPair.set(undefined);
    this.symbolSelected.emit(tradingPairToAdd);
  }
}
