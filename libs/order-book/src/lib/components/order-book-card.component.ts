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
import { OrderBookWSService } from '../order-book-ws.service';
import { OrderBookEntryTableComponent } from './order-book-entry-table.component';

@Component({
  selector: 'bp-order-book-card',
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>{{ symbol() | uppercase }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="mt-4">
          @if (orderBookData(); as orderBookData) {
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <bp-order-book-entry-table
                  [entries]="orderBookData.bids"
                  title="Bids"
                />
              </div>
              <div>
                <bp-order-book-entry-table
                  [entries]="orderBookData.asks"
                  title="Asks"
                />
              </div>
            </div>
          } @else if (orderBookData() === null) {
            <span class="text-sm text-red-500"
              >Error loading order book data.</span
            >
          } @else {
            <span class="text-sm italic">Waiting for order book data...</span>
          }
        </div>
      </mat-card-content>
      <mat-card-actions align="end">
        <button
          (click)="removeOrderBook()"
          mat-button
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

  readonly orderBookData = this.#orderBookWSService.orderBookData;

  ngOnInit() {
    this.#orderBookWSService.connect(this.symbol());
  }

  removeOrderBook() {
    this.remove.emit(this.symbol());
  }
}
