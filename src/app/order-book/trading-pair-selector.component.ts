import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'cp-trading-pair-selector',
  template: `
    @if (tradingPairs(); as tradingPairs) {
      <select (change)="addTradingPair($event)">
        <option [value]="undefined">Please add a pair</option>
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
  tradingPairs = input.required<{ symbol: string }[] | undefined>();
  pairSelected = output<string>();

  addTradingPair(event: Event) {
    const target = event.target as HTMLSelectElement;
    const tradingPairToAdd = target.value;
    if (tradingPairToAdd) {
      this.pairSelected.emit(tradingPairToAdd);
    }
  }
}
