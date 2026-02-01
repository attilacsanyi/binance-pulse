import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { dividerVariants, type DividerVariants } from './divider.variants';

@Component({
  selector: 'bp-divider',
  standalone: true,
  template: `<hr [class]="classes()" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {
  readonly orientation = input<DividerVariants['orientation']>('horizontal');
  readonly class = input('');

  classes() {
    return dividerVariants({
      orientation: this.orientation(),
      class: this.class(),
    });
  }
}
