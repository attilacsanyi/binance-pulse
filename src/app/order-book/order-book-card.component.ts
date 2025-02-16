import { DecimalPipe, UpperCasePipe } from '@angular/common';
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
    <h2 class="text-xl font-bold text-gray-900">{{ symbol() | uppercase }}</h2>
    @if (orderBookData(); as orderBookData) {
      <!-- Table for bids -->
      <h3 class="text-lg font-bold">Bids</h3>
      <table>
        <thead>
          <tr>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          @for (bid of orderBookData.bids; track bid.price) {
            <tr>
              <td>{{ bid.price | number: '1.1-6' }}</td>
              <td>{{ bid.quantity | number: '1.1-3' }}</td>
            </tr>
          }
        </tbody>
      </table>
      <!-- Table for asks -->
      <h3 class="text-lg font-bold">Asks</h3>
      <table>
        <thead>
          <tr>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          @for (ask of orderBookData.asks; track ask.price) {
            <tr>
              <td>{{ ask.price | number: '1.1-6' }}</td>
              <td>{{ ask.quantity | number: '1.1-3' }}</td>
            </tr>
          }
        </tbody>
      </table>
      <button (click)="removeOrderBook()">Remove</button>
    } @else {
      <div>Waiting for order book data...</div>
    }
  `,
  imports: [UpperCasePipe, DecimalPipe],
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
