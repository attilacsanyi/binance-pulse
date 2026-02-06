import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import {
  ButtonComponent,
  CardActionsComponent,
  CardComponent,
  CardContentComponent,
  CardHeaderComponent,
  CardTitleComponent,
} from '@bp/ui';
import { OrderBookWSService } from '../order-book-ws.service';
import { OrderBookEntryTableComponent } from './order-book-entry-table.component';

@Component({
  selector: 'bp-order-book-card',
  template: `
    <bp-card>
      <bp-card-header>
        <bp-card-title>{{ symbol() | uppercase }}</bp-card-title>
      </bp-card-header>
      <bp-card-content>
        <div class="mt-4">
          @if (orderBookData(); as orderBookData) {
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <bp-order-book-entry-table
                [entries]="orderBookData.bids"
                title="Bids"
              />
              <bp-order-book-entry-table
                [entries]="orderBookData.asks"
                title="Asks"
              />
            </div>
          } @else if (orderBookData() === null) {
            <span class="text-error text-sm"
              >Error loading order book data.</span
            >
          } @else {
            <span class="text-on-surface-muted text-sm italic"
              >Waiting for order book data...</span
            >
          }
        </div>
      </bp-card-content>
      <bp-card-actions>
        <bp-button
          (click)="removeOrderBook()"
          variant="ghost"
          aria-label="Remove order book"
        >
          Remove
        </bp-button>
      </bp-card-actions>
    </bp-card>
  `,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardContentComponent,
    CardActionsComponent,
    ButtonComponent,
    UpperCasePipe,
    OrderBookEntryTableComponent,
  ],
  providers: [OrderBookWSService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderBookCardComponent implements OnInit {
  symbol = input.required<string>();
  remove = output<string>();

  readonly #orderBookWSService = inject(OrderBookWSService);

  readonly orderBookData = this.#orderBookWSService.orderBookData;

  ngOnInit() {
    this.#orderBookWSService.connect(this.symbol());
  }

  removeOrderBook() {
    this.remove.emit(this.symbol());
  }
}
