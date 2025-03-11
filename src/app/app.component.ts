import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'bp-root',
  template: `
    <div class="min-h-screen">
      <header class="shadow-sm">
        <div class="mx-auto max-w-7xl px-4 py-4">
          <div class="flex items-center">
            <img
              routerLink="/"
              ngSrc="logo.png"
              alt="Binance Pulse Logo"
              class="mr-4 cursor-pointer"
              loading="eager"
              width="32"
              height="32"
            />
            <h1 class="text-2xl font-bold">{{ title }}</h1>
          </div>
          <div class="my-4">
            <mat-divider />
          </div>
          <nav class="flex gap-4">
            @for (
              navItem of navItems;
              track navItem.routerLink;
              let last = $last
            ) {
              <a
                routerLinkActive="active hover:animate-none"
                class="flex items-center gap-2 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:animate-pulse"
                [routerLink]="navItem.routerLink"
                [routerLinkActiveOptions]="{ exact: true }"
                ><mat-icon>{{ navItem.icon }}</mat-icon
                >{{ navItem.label }}</a
              >
              @if (!last) {
                <mat-divider [vertical]="true"></mat-divider>
              }
            }
          </nav>
        </div>
      </header>
      <main class="mx-auto max-w-7xl px-4 py-6">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: `
    .active {
      color: var(--mat-sys-on-primary-container);
    }
  `,
  imports: [RouterModule, NgOptimizedImage, MatIconModule, MatDividerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Binance Pulse';

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
