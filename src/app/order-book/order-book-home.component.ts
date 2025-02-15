import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TradingPairSelectorComponent } from '../trading-pair-selector.component';
import { OrderBookComponent } from './order-book-detail.component';

@Component({
  template: `
    <cp-trading-pair-selector />
    <cp-order-book symbol="soleth" />
  `,
  imports: [TradingPairSelectorComponent, OrderBookComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrderBookHomeComponent {}
