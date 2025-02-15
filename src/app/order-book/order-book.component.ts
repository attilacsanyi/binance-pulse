import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { OrderBookService } from './order-book.service';

@Component({
  selector: 'cp-order-book',
  template: `
    <div>
      <h2>Order Book: {{ symbol() | uppercase }}</h2>
      <button (click)="remove()">Remove</button>
    </div>
  `,
  imports: [UpperCasePipe],
  providers: [OrderBookService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderBookComponent implements OnInit {
  symbol = input.required<string>();

  readonly #orderBookService = inject(OrderBookService);

  ngOnInit() {
    this.#orderBookService.connect(this.symbol());
  }

  remove() {
    this.#orderBookService.disconnect();
  }
}
