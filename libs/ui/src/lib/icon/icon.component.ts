import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  faSolidHouse,
  faSolidListUl,
  faSolidSpinner,
} from '@ng-icons/font-awesome/solid';
import { iconVariants, type IconVariants } from './icon.variants';

/**
 * Icon component wrapping ng-icons with Tailwind Variants.
 *
 * @example Basic usage
 * ```html
 * <bp-icon name="faHouse" />
 * ```
 *
 * @example Spinner (loading state)
 * ```html
 * <bp-icon name="faSpinner" animate="spin" class="text-primary" />
 * ```
 *
 * @see https://ng-icons.github.io/ng-icons/
 * @see https://fontawesome.com/icons
 */
@Component({
  selector: 'bp-icon',
  standalone: true,
  imports: [NgIcon],
  viewProviders: [
    provideIcons({ faSolidHouse, faSolidListUl, faSolidSpinner }),
  ],
  template: `<ng-icon
    [class]="classes()"
    [name]="name()"
  />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  /** Icon name from Font Awesome Solid (e.g., 'faHouse', 'faSpinner') */
  readonly name = input.required<string>();

  /** Icon size variant */
  readonly size = input<IconVariants['size']>('md');

  /** Animation variant - use 'spin' for loading spinners */
  readonly animate = input<IconVariants['animate']>('none');

  /** Additional CSS classes */
  readonly class = input('');

  classes() {
    return iconVariants({
      size: this.size(),
      animate: this.animate(),
      class: this.class(),
    });
  }
}
