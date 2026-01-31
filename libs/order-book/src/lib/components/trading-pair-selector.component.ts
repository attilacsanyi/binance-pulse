import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  effect,
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
          [formControl]="control"
          [matAutocomplete]="auto"
          (focus)="filter()"
          (input)="filter()"
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

    mat-spinner[matSuffix] {
      margin-right: 8px;
    }
  `,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradingPairSelectorComponent {
  readonly tradingPairs = input.required<{ symbol: string }[] | null>();
  readonly loading = input(false, { transform: booleanAttribute });
  // REQ: use signal forms here
  readonly control = new FormControl<string>('', { nonNullable: true });

  // eslint-disable-next-line no-unused-private-class-members
  readonly #loadingEffect = effect(() => {
    if (this.loading()) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  });

  readonly tradingPairInput =
    viewChild.required<ElementRef<HTMLInputElement>>('tradingPairInput');

  readonly pairSelected = outputFromObservable(
    this.control.valueChanges.pipe(
      takeUntilDestroyed(),
      filter((value): value is string => value.length > 0),
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
