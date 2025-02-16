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
    <h3 class="mb-4 pl-4 text-lg font-bold">{{ title() }}</h3>
    <table
      class="entry-table"
      mat-table
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
    @use '@angular/material' as mat;

    :host {
      display: contents;
    }

    .entry-table {
      // https://material.angular.io/components/table/styling
      @include mat.table-overrides(
        (
          header-container-height: 2rem,
          row-item-container-height: 2rem,
          header-headline-size: var(--mat-sys-title-medium-size),
          row-item-label-text-size: var(--mat-sys-body-small-size),
        )
      );

      // https://material.angular.io/components/table/overview#row-templates
      .mat-mdc-row .mat-mdc-cell {
        border-bottom: none;
        border-top: none;
      }
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
      header: 'Qty',
      cell: (element: OrderBookEntryVM) =>
        `${this.#decimalPipe.transform(element.quantity, '1.1-3')}`,
    },
  ];
  displayedColumns = this.columns.map(c => c.columnDef);
}
