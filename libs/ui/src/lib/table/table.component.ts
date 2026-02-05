import { Grid, GridCell, GridRow } from '@angular/aria/grid';
import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { tableVariants } from './table.variants';

/**
 * Table component wrapping Angular Aria Grid with Tailwind Variants.
 *
 * @see https://angular.dev/guide/aria/grid
 */
@Component({
  selector: 'bp-table',
  standalone: true,
  imports: [Grid, GridCell, GridRow, DecimalPipe],
  template: `
    @if (title()) {
      <h3 [class]="styles().title()">{{ title() }}</h3>
    }
    <table
      [class]="styles().root()"
      ngGrid
    >
      <thead>
        <tr
          [class]="styles().headerRow()"
          ngGridRow
        >
          @for (col of columns(); track col.key) {
            <th
              [class]="styles().headerCell()"
              ngGridCell
            >
              {{ col.header }}
            </th>
          }
        </tr>
      </thead>
      <tbody>
        @for (row of data(); track $index) {
          <tr
            [class]="styles().bodyRow()"
            ngGridRow
          >
            @for (col of columns(); track col.key) {
              <td
                [class]="styles().bodyCell()"
                ngGridCell
              >
                {{ col.cell(row) }}
              </td>
            }
          </tr>
        }
      </tbody>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> {
  readonly title = input<string>();
  readonly columns = input<
    { key: string; header: string; cell: (row: T) => string }[]
  >([]);
  readonly data = input<T[]>([]);

  styles() {
    return tableVariants();
  }
}
