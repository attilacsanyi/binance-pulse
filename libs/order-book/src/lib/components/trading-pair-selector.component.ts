import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { disabled, form, FormField } from '@angular/forms/signals';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Trading pair selector using Signal Forms (Angular experimental API).
 * @docs https://angular.dev/essentials/signal-forms
 * @docs https://material.angular.io/components/autocomplete/examples#autocomplete-require-selection
 */
@Component({
  selector: 'bp-trading-pair-selector',
  template: `
    <form>
      <mat-form-field>
        <mat-label>Trading Pair</mat-label>
        <input
          [formField]="tradingPairForm.tradingPair"
          [matAutocomplete]="auto"
          (input)="onInputChange($event)"
          matInput
          placeholder="Add one"
          type="text"
        />
        @if (loading()) {
          <mat-spinner
            diameter="20"
            matSuffix
          />
        }
        <mat-autocomplete
          #auto="matAutocomplete"
          (optionSelected)="onOptionSelected($event.option.value)"
          requireSelection
        >
          @for (pair of filteredTradingPairs(); track pair.symbol) {
            <mat-option [value]="pair.symbol">{{ pair.symbol }}</mat-option>
          }
        </mat-autocomplete>
      </mat-form-field>
    </form>
  `,
  host: {
    style: 'display: contents',
  },
  styles: `
    mat-spinner[matSuffix] {
      margin-right: 8px;
    }
  `,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    FormField,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradingPairSelectorComponent {
  readonly tradingPairs = input.required<{ symbol: string }[] | null>();
  readonly loading = input(false, { transform: booleanAttribute });
  readonly pairSelected = output<string>();

  readonly #model = signal({ tradingPair: '' });
  readonly #filterValue = signal('');

  readonly tradingPairForm = form(this.#model, schemaPath => {
    disabled(schemaPath.tradingPair, () => this.loading());
  });

  /** Filters trading pairs based on the current input value. */
  readonly filteredTradingPairs = computed(() => {
    const pairs = this.tradingPairs() ?? [];
    const filterValue = this.#filterValue().toLowerCase();
    if (!filterValue) {
      return pairs;
    }
    return pairs.filter(pair =>
      pair.symbol.toLowerCase().includes(filterValue),
    );
  });

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.#filterValue.set(target.value);
  }

  onOptionSelected(symbol: string): void {
    this.pairSelected.emit(symbol);
  }
}
