import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { TableComponent } from '@bp/ui';

import { OrderBookEntry as OrderBookEntryVM } from '../models';

/**
 * Order book entry table using bp-table (Angular Aria Grid).
 *
 * @see libs/ui/src/lib/table/table.component.ts
 */
@Component({
  selector: 'bp-order-book-entry-table',
  template: `
    <bp-table
      [columns]="columns"
      [data]="entries()"
      [title]="title()"
    />
  `,
  host: {
    style: 'display: contents',
  },
  imports: [TableComponent],
  providers: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderBookEntryTableComponent {
  title = input.required<string>();
  entries = input.required<OrderBookEntryVM[]>();

  readonly #decimalPipe = inject(DecimalPipe);

  columns = [
    {
      key: 'price',
      header: 'Price',
      cell: (element: OrderBookEntryVM) => `${element.price}`,
    },
    {
      key: 'quantity',
      header: 'Qty',
      cell: (element: OrderBookEntryVM) =>
        `${this.#decimalPipe.transform(element.quantity, '1.1-3')}`,
    },
  ];
}
