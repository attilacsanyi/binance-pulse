import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DividerComponent, IconComponent } from '@bp/ui';

@Component({
  selector: 'bp-navbar',
  template: `
    <nav class="flex gap-4">
      @for (navItem of navItems; track navItem.routerLink; let last = $last) {
        <a
          [attr.aria-label]="navItem.label"
          [routerLink]="navItem.routerLink"
          [routerLinkActiveOptions]="{ exact: true }"
          routerLinkActive="active hover:animate-none"
          class="flex items-center gap-2 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:animate-pulse"
          ><bp-icon [name]="navItem.icon" />{{ navItem.label }}</a
        >
        @if (!last) {
          <bp-divider orientation="vertical" />
        }
      }
    </nav>
  `,
  host: {
    style: 'display: contents',
  },
  styles: `
    .active {
      color: var(--color-primary-value);
    }
  `,
  imports: [RouterModule, IconComponent, DividerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  readonly navItems = [
    {
      label: 'Home',
      icon: 'faHouse',
      routerLink: '/',
    },
    {
      label: 'Order Book',
      icon: 'faListUl',
      routerLink: '/order-book',
    },
  ];
}
