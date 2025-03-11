import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  linkedSignal,
  viewChild,
} from '@angular/core';
import {
  outputFromObservable,
  takeUntilDestroyed,
} from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { filter } from 'rxjs';

/**
 * @docs: https://material.angular.io/components/autocomplete/examples#autocomplete-require-selection
 */
@Component({
  selector: 'bp-trading-pair-selector',
  template: `
    <form>
      <mat-form-field>
        <mat-label>Trading Pair</mat-label>
        <input
          #tradingPairInput
          placeholder="Add one"
          matInput
          type="text"
          [formControl]="control"
          [matAutocomplete]="auto"
          (input)="filter()"
          (focus)="filter()"
        />
        <mat-autocomplete
          #auto="matAutocomplete"
          requireSelection
        >
          @for (pair of filteredTradingPairs(); track pair.symbol) {
            <mat-option [value]="pair.symbol">{{ pair.symbol }}</mat-option>
          }
        </mat-autocomplete>
      </mat-form-field>
    </form>
  `,
  styles: `
    :host {
      display: contents;
    }
  `,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradingPairSelectorComponent {
  readonly tradingPairs = input.required<{ symbol: string }[] | undefined>();
  readonly control = new FormControl('');

  readonly tradingPairInput =
    viewChild.required<ElementRef<HTMLInputElement>>('tradingPairInput');

  readonly pairSelected = outputFromObservable(
    this.control.valueChanges.pipe(
      takeUntilDestroyed(),
      filter(value => value !== null),
    ),
  );

  readonly filteredTradingPairs = linkedSignal(() => this.tradingPairs() ?? []);

  filter(): void {
    const filterValue =
      this.tradingPairInput().nativeElement.value.toLowerCase();
    this.filteredTradingPairs.set(
      this.tradingPairs()?.filter(o =>
        o.symbol.toLowerCase().includes(filterValue),
      ) ?? [],
    );
  }
}
