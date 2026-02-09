import {
  Combobox,
  ComboboxInput,
  ComboboxPopupContainer,
} from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  untracked,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormValueControl } from '@angular/forms/signals';
import { IconComponent } from '../icon/icon.component';
import {
  AutocompleteVariants,
  autocompleteVariants,
} from './autocomplete.variants';

/**
 * Autocomplete component wrapping Angular Aria with Tailwind Variants.
 *
 * Uses ngCombobox from @angular/aria/combobox with ngListbox from @angular/aria/listbox
 * for accessible autocomplete functionality.
 *
 * @see https://angular.dev/guide/aria/autocomplete
 * @see https://angular.dev/guide/forms/signals/custom-controls
 */
@Component({
  selector: 'bp-autocomplete',
  standalone: true,
  imports: [
    Combobox,
    ComboboxInput,
    ComboboxPopupContainer,
    Listbox,
    Option,
    OverlayModule,
    FormsModule,
    IconComponent,
  ],
  template: `
    <div
      [class]="styles().root()"
      [filterMode]="filterMode()"
      ngCombobox
    >
      <div
        #origin
        [class]="styles().inputWrapper()"
      >
        @if (label()) {
          <label
            [class]="styles().label()"
            [for]="inputId()"
            >{{ label() }}</label
          >
        }
        <input
          [(ngModel)]="query"
          [attr.aria-invalid]="invalid()"
          [attr.aria-label]="ariaLabel() || label() || placeholder()"
          [class]="styles().input()"
          [disabled]="disabled()"
          [id]="inputId()"
          [placeholder]="placeholder()"
          [readonly]="readonly()"
          (blur)="touched.set(true)"
          ngComboboxInput
        />
        @if (loading()) {
          <div [class]="styles().spinnerWrapper()">
            <bp-icon
              name="faSpinner"
              animate="spin"
              size="sm"
              class="text-primary"
            />
          </div>
        }
      </div>
      <ng-template ngComboboxPopupContainer>
        <ng-template
          [cdkConnectedOverlay]="{
            origin,
            usePopover: 'inline',
            matchWidth: true,
          }"
          [cdkConnectedOverlayOpen]="true"
        >
          <div
            [class]="styles().listbox()"
            class="popup"
          >
            @if (filteredOptions().length === 0) {
              <div class="text-on-surface-muted px-3 py-2 text-sm">
                No results found
              </div>
            }
            <div
              [values]="selectedAsArray()"
              (valuesChange)="handleSelection($event)"
              ngListbox
            >
              @for (option of filteredOptions(); track option.value) {
                <div
                  [class]="styles().option()"
                  [label]="option.label"
                  [value]="option.value"
                  ngOption
                >
                  {{ option.label }}
                </div>
              }
            </div>
          </div>
        </ng-template>
      </ng-template>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    /* Hide popup when combobox is collapsed (aria-expanded="false") */
    [ngCombobox]:has([aria-expanded='false']) .popup {
      display: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements FormValueControl<string> {
  /** The selected value, bound by the `[formField]` directive. */
  readonly value = model<string>('');

  /** Optional label displayed above the input. */
  readonly label = input<string>();

  /** Placeholder text for the input. */
  readonly placeholder = input('Select an option');

  /**
   * Array of option objects.
   * Use `optionLabel` and `optionValue` to specify which properties to read.
   */
  readonly options = input<{ label: string; value: string }[]>([]);

  /** Shows loading spinner when true. */
  readonly loading = input(false, { transform: booleanAttribute });

  /** Disables the autocomplete when true. */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Tracks if the input has been touched. */
  readonly touched = model<boolean>(false);

  /** Tracks if the input is readonly. */
  readonly readonly = input<boolean>(false);

  /** Tracks if the input is invalid. */
  readonly invalid = input<boolean>(false);

  /** HTML id for the input element. */
  readonly inputId = input('autocomplete-input');

  /** Aria label for accessibility (falls back to label, then placeholder). */
  readonly ariaLabel = input<string>();

  readonly variant = input<AutocompleteVariants['variant']>('primary');
  readonly class = input('');

  /**
   * Filter mode for the combobox:
   * - 'auto-select': Updates input value to match first filtered option
   * - 'manual': Input only changes when user explicitly confirms
   * - 'highlight': Navigate without changing input until explicit selection
   */
  readonly filterMode = input<'auto-select' | 'manual' | 'highlight'>('manual');

  /** The query string used to filter the list of options. */
  protected readonly query = model('');

  /** Filtered options based on query. */
  protected readonly filteredOptions = computed(() => {
    const queryValue = this.query().toLowerCase().trim();
    if (!queryValue) {
      return this.options();
    }
    return this.options().filter(option =>
      option.label.toLowerCase().includes(queryValue),
    );
  });

  styles() {
    return autocompleteVariants({
      variant: this.variant(),
      class: this.class(),
    });
  }

  private readonly combobox = viewChild(Combobox);

  /**
   * Listbox uses an array for selection (multi/single).
   * We wrap our single string value into an array for the ngListbox directive.
   */
  selectedAsArray = computed(() => [this.value()]);

  /** Syncing UI -> Form (User Selection from dropdown) */
  handleSelection(selected: string[]) {
    const selectedValue = selected[0] ?? '';
    this.value.set(selectedValue);
    // console.debug('>>handleSelection', selectedValue);
  }

  /** Syncing Form -> UI (Initial load or programmatic set from form value) */
  // eslint-disable-next-line no-unused-private-class-members
  readonly #syncFormToUiEffect = effect(() => {
    const currentVal = this.value();
    const match = this.options().find(o => o.value === currentVal);
    untracked(() => {
      this.query.set(match ? match.label : '');
    });
  });

  // constructor() {
  //   // Syncing Form -> UI (Initial load or programmatic set from form value)
  //   effect(() => {
  //     const currentVal = this.value();
  //     const match = this.options().find(o => o.value === currentVal);
  //     untracked(() => {
  //       this.query.set(match ? match.label : '');
  //     });
  //   });
  // }

  // DEBUG EFFECTS

  // // eslint-disable-next-line no-unused-private-class-members
  // readonly #queryEffect = effect(() => {
  //   console.debug('>> aria query', this.query());
  // });

  // // eslint-disable-next-line no-unused-private-class-members
  // readonly #valueEffect = effect(() => {
  //   console.debug('>> form value', this.value());
  // });
}
