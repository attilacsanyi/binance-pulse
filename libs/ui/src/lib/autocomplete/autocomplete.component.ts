import {
  Combobox,
  ComboboxInput,
  ComboboxPopupContainer,
} from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { autocompleteVariants } from './autocomplete.variants';

/**
 * Autocomplete component wrapping Angular Aria with Tailwind Variants.
 *
 * Uses ngCombobox from @angular/aria/combobox with ngListbox from @angular/aria/listbox
 * for accessible autocomplete functionality.
 *
 * @see https://angular.dev/guide/aria/autocomplete
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
          [attr.aria-label]="ariaLabel() || label()"
          [class]="styles().input()"
          [disabled]="disabled()"
          [id]="inputId()"
          [placeholder]="placeholder()"
          (ngModelChange)="onInputChange($event)"
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
            <div ngListbox>
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
export class AutocompleteComponent {
  /** Optional label displayed above the input */
  readonly label = input<string>();

  /** Placeholder text for the input */
  readonly placeholder = input('');

  /** Array of options to display in the dropdown */
  readonly options = input<{ value: string; label: string }[]>([]);

  /** Shows loading spinner when true */
  readonly loading = input(false);

  /** Disables the autocomplete when true */
  readonly disabled = input(false);

  /** HTML id for the input element */
  readonly inputId = input('autocomplete-input');

  /** Aria label for accessibility (falls back to label if not provided) */
  readonly ariaLabel = input<string>();

  /**
   * Filter mode for the combobox:
   * - 'auto-select': Updates input value to match first filtered option as user types
   * - 'manual': Input only changes when user explicitly confirms selection
   * - 'highlight': Allows navigation without changing input until explicit selection
   */
  readonly filterMode = input<'auto-select' | 'manual' | 'highlight'>(
    'highlight',
  );

  /** Emits when the input value changes */
  readonly inputChange = output<string>();

  /** Emits when an option is selected */
  readonly optionSelected = output<string>();

  /** Current query/input value */
  query = signal('');

  /** Filtered options based on query */
  filteredOptions = computed(() => {
    const queryValue = this.query().toLowerCase();
    if (!queryValue) {
      return this.options();
    }
    return this.options().filter(option =>
      option.label.toLowerCase().includes(queryValue),
    );
  });

  styles() {
    return autocompleteVariants();
  }

  onInputChange(value: string) {
    this.query.set(value);
    this.inputChange.emit(value);
  }
}
