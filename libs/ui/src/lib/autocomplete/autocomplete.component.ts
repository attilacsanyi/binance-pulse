import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { autocompleteVariants } from './autocomplete.variants';

@Component({
  selector: 'bp-autocomplete',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div [class]="styles().root()">
      @if (label()) {
        <label
          [class]="styles().label()"
          [for]="inputId()"
          >{{ label() }}</label
        >
      }
      <div [class]="styles().inputWrapper()">
        <input
          [class]="styles().input()"
          [disabled]="disabled()"
          [id]="inputId()"
          [placeholder]="placeholder()"
          (input)="onInput($event)"
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
      @if (options().length > 0) {
        <ul [class]="styles().listbox()">
          @for (option of options(); track option.value) {
            <li
              [class]="styles().option()"
              (click)="onOptionSelect(option.value)"
              (keydown.enter)="onOptionSelect(option.value)"
              tabindex="0"
            >
              {{ option.label }}
            </li>
          }
        </ul>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent {
  readonly label = input<string>();
  readonly placeholder = input('');
  readonly options = input<{ value: string; label: string }[]>([]);
  readonly loading = input(false);
  readonly disabled = input(false);
  readonly inputId = input('autocomplete-input');

  readonly inputChange = output<string>();
  readonly optionSelected = output<string>();

  styles() {
    return autocompleteVariants();
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.inputChange.emit(value);
  }

  onOptionSelect(value: string) {
    this.optionSelected.emit(value);
  }
}
