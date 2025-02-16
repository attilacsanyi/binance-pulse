import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';

interface OrderBookEntryVM {
  price: string;
  quantity: string;
}

/**
 * @docs: https://material.angular.io/components/table/examples#table-column-styling
 */
@Component({
  selector: 'bp-order-book-entry-table',
  template: `
    <h3 class="my-4 text-lg font-bold">{{ title() }}</h3>
    <table
      mat-table
      class="mat-elevation-z8 demo-table"
      [dataSource]="entries()"
    >
      @for (column of columns; track column) {
        <ng-container [matColumnDef]="column.columnDef">
          <th
            *matHeaderCellDef
            mat-header-cell
          >
            {{ column.header }}
          </th>
          <td
            *matCellDef="let row"
            mat-cell
          >
            {{ column.cell(row) }}
          </td>
        </ng-container>
      }

      <tr
        *matHeaderRowDef="displayedColumns"
        mat-header-row
      ></tr>
      <tr
        *matRowDef="let row; columns: displayedColumns"
        mat-row
      ></tr>
    </table>
  `,
  styles: `
    :host {
      display: contents;
    }
  `,
  imports: [MatTableModule],
  providers: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderBookEntryTableComponent {
  title = input.required<string>();
  entries = input.required<OrderBookEntryVM[]>();

  readonly #decimalPipe = inject(DecimalPipe);

  columns = [
    {
      columnDef: 'price',
      header: 'Price',
      cell: (element: OrderBookEntryVM) => `${element.price}`,
    },
    {
      columnDef: 'quantity',
      header: 'Quantity',
      cell: (element: OrderBookEntryVM) =>
        `${this.#decimalPipe.transform(element.quantity, '1.1-3')}`,
    },
  ];
  displayedColumns = this.columns.map(c => c.columnDef);
}
