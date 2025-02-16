import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { OrderBookEntryTableComponent } from './order-book-entry-table.component';
import { OrderBookWSService } from './order-book-ws.service';

@Component({
  selector: 'bp-order-book-card',
  template: `
    <h2 class="text-xl font-bold text-gray-900">{{ symbol() | uppercase }}</h2>
    @if (orderBookData(); as orderBookData) {
      <bp-order-book-entry-table
        title="Bids"
        [entries]="orderBookData.bids"
      />
      <bp-order-book-entry-table
        title="Asks"
        [entries]="orderBookData.asks"
      />
      <button (click)="removeOrderBook()">Remove</button>
    } @else {
      <div>Waiting for order book data...</div>
    }
  `,
  imports: [UpperCasePipe, OrderBookEntryTableComponent],
  providers: [OrderBookWSService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderBookCardComponent implements OnInit {
  symbol = input.required<string>();
  remove = output<string>();

  readonly #orderBookWSService = inject(OrderBookWSService);

  orderBookData = this.#orderBookWSService.orderBookData;

  ngOnInit() {
    this.#orderBookWSService.connect(this.symbol());
  }

  removeOrderBook() {
    this.#orderBookWSService.disconnect();
    this.remove.emit(this.symbol());
  }
}
