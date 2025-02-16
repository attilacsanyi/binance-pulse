import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { OrderBookEntryTableComponent } from './order-book-entry-table.component';
import { OrderBookWSService } from './order-book-ws.service';

@Component({
  selector: 'bp-order-book-card',
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>{{ symbol() | uppercase }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        @if (orderBookData(); as orderBookData) {
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <bp-order-book-entry-table
                title="Bids"
                [entries]="orderBookData.bids"
              />
            </div>
            <div>
              <bp-order-book-entry-table
                title="Asks"
                [entries]="orderBookData.asks"
              />
            </div>
          </div>
        } @else {
          <div>Waiting for order book data...</div>
        }
      </mat-card-content>
      <mat-card-actions align="end">
        <button
          mat-button
          (click)="removeOrderBook()"
        >
          Remove
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  imports: [
    MatCardModule,
    MatButtonModule,
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

  orderBookData = this.#orderBookWSService.orderBookData;

  ngOnInit() {
    this.#orderBookWSService.connect(this.symbol());
  }

  removeOrderBook() {
    this.#orderBookWSService.disconnect();
    this.remove.emit(this.symbol());
  }
}
