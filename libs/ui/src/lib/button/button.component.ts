import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { buttonVariants, type ButtonVariants } from './button.variants';

@Component({
  selector: 'bp-button',
  standalone: true,
  template: `
    <button
      [class]="classes()"
      [disabled]="disabled()"
      [type]="type()"
    >
      <ng-content />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly variant = input<ButtonVariants['variant']>('primary');
  readonly size = input<ButtonVariants['size']>('md');
  readonly disabled = input(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly class = input('');

  classes() {
    return buttonVariants({
      variant: this.variant(),
      size: this.size(),
      class: this.class(),
    });
  }
}
