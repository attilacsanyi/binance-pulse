import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { OrderBookComponent } from './order-book-detail.component';

@Component({
  selector: 'cp-order-book-list',
  template: `
    <div>
      @for (symbol of orderBookSymbols(); track symbol) {
        <cp-order-book [symbol]="symbol" />
      }
    </div>
  `,
  imports: [OrderBookComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderBookListComponent {
  orderBookSymbols = input.required<string[]>();
}
