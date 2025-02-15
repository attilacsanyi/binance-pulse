import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { OrderBookWSService } from './order-book-ws.service';

@Component({
  selector: 'cp-order-book-card',
  template: `
    <h2>Order Book: {{ symbol() | uppercase }}</h2>
    @if (orderBookData(); as orderBookData) {
      <button (click)="removeOrderBook()">Remove</button>
    } @else {
      <div>Waiting for order book data...</div>
    }
  `,
  imports: [UpperCasePipe],
  providers: [OrderBookWSService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderBookCardComponent implements OnInit {
  symbol = input.required<string>();
  remove = output<string>();

  readonly #orderBookService = inject(OrderBookWSService);

  orderBookData = this.#orderBookService.orderBookData;

  ngOnInit() {
    this.#orderBookService.connect(this.symbol());
  }

  removeOrderBook() {
    this.#orderBookService.disconnect();
    this.remove.emit(this.symbol());
  }
}
