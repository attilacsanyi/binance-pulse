import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

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
          ><mat-icon>{{ navItem.icon }}</mat-icon
          >{{ navItem.label }}</a
        >
        @if (!last) {
          <mat-divider [vertical]="true"></mat-divider>
        }
      }
    </nav>
  `,
  host: {
    style: 'display: contents',
  },
  styles: `
    .active {
      color: var(--mat-sys-on-primary-container);
    }
  `,
  imports: [RouterModule, MatIconModule, MatDividerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  readonly navItems = [
    {
      label: 'Home',
      icon: 'home',
      routerLink: '/',
    },
    {
      label: 'Order Book',
      icon: 'list_alt',
      routerLink: '/order-book',
    },
  ];
}
