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
  selector: 'cp-order-book',
  template: `
    <div>
      <h2>Order Book: {{ symbol() | uppercase }}</h2>
      <button (click)="removeOrderBook()">Remove</button>
    </div>
  `,
  imports: [UpperCasePipe],
  providers: [OrderBookWSService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderBookComponent implements OnInit {
  symbol = input.required<string>();
  remove = output<string>();

  readonly #orderBookService = inject(OrderBookWSService);

  ngOnInit() {
    this.#orderBookService.connect(this.symbol());
  }

  removeOrderBook() {
    this.#orderBookService.disconnect();
    this.remove.emit(this.symbol());
  }
}
