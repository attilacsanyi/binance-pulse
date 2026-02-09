import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';
import { disabled, form, FormField } from '@angular/forms/signals';
import { AutocompleteComponent } from '@bp/ui';
import { filter, tap } from 'rxjs';

type FormModel = {
  tradingPair: string;
};

const initialFormModel: FormModel = {
  tradingPair: 'BTCUSDC',
};

/**
 * Trading pair selector using Angular Aria autocomplete.
 *
 * @see https://angular.dev/guide/aria/autocomplete
 */
@Component({
  selector: 'bp-trading-pair-selector',
  template: `
    <!--<form
      (submit)="onSubmit($event)"
      novalidate
    > -->
    <!-- Trading pair selector -->
    @let tradingPair = form.tradingPair;
    @let tradingPairInvalid =
      tradingPair().invalid() && tradingPair().touched();
    <bp-autocomplete
      [formField]="tradingPair"
      [loading]="tradingPairsLoading()"
      [options]="tradingPairsOptions()"
      [variant]="tradingPairInvalid ? 'error' : 'primary'"
      label="Trading Pair"
      placeholder="Select a trading pair"
    />
    @if (tradingPairInvalid) {
      <ul>
        @for (error of tradingPair().errors(); track error) {
          <li class="text-red-500">{{ error.message }}</li>
        }
      </ul>
    }
    <!-- </form> -->
  `,
  host: {
    style: 'display: contents',
  },
  imports: [AutocompleteComponent, FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradingPairSelectorComponent {
  readonly tradingPairs = input.required<{ symbol: string }[] | null>();
  readonly tradingPairsLoading = input(false, { transform: booleanAttribute });

  readonly #formModel = signal<FormModel>(initialFormModel);
  readonly form = form(this.#formModel, schemaPath => {
    disabled(schemaPath.tradingPair, () => this.tradingPairsLoading());
    // required(schemaPath.tradingPair, { message: 'Trading pair is required' });
    // minLength(schemaPath.tradingPair, 2, {
    //   message: 'Trading pair must be at least 2 characters long',
    // });
  });

  /** Emit trading pair on form value change */
  readonly pairSelected = outputFromObservable(
    toObservable(this.form.tradingPair().value).pipe(
      filter(value => this.form.tradingPair().valid() && value !== ''),
      tap(() => this.form.tradingPair().reset('')),
    ),
  );

  protected readonly tradingPairsOptions = computed(() => {
    const tradingPairs = this.tradingPairs();
    if (!tradingPairs) return [];

    return tradingPairs.map(pair => ({
      label: pair.symbol,
      value: pair.symbol,
    }));
  });

  /** Emit trading pair on form value change, but need the reset hack, so this seems not a perfect solution */
  // readonly #tradingPairSelectedEffect = effect(() => {
  //   const tradingPair = this.#formModel().tradingPair;
  //   console.debug('>>effect', tradingPair);
  //   if (this.form.tradingPair().valid() && tradingPair !== '') {
  //     console.debug('>>tradingPairSelected', tradingPair);
  //     this.pairSelected.emit(tradingPair);
  //     this.form.tradingPair().reset('');
  //   }
  // });

  /** If we want to emit trading pair on submit, we can use this method and uncomment the form wrapper in the template */
  // onSubmit(event: Event) {
  //   event.preventDefault();
  //   submit(this.form, async form => {
  //     if (form.tradingPair().valid()) {
  //       this.pairSelected.emit(this.#formModel().tradingPair);
  //     }
  //   });
  // }
}
