import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'cp-order-book-entry-table',
  template: `
    <h3 class="text-lg font-bold">{{ title() }}</h3>
    <table>
      <thead>
        <tr>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        @for (entry of entries(); track entry.price) {
          <tr>
            <td>{{ entry.price }}</td>
            <td>{{ entry.quantity | number: '1.1-3' }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
  imports: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderBookEntryTableComponent {
  title = input.required<string>();
  entries = input.required<{ price: string; quantity: string }[]>();
}
