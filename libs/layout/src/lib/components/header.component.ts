import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';

@Component({
  selector: 'bp-header',
  template: `
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
      </div>
    </header>
    <bp-navbar />
  `,
  styles: `
    .active {
      color: var(--mat-sys-on-primary-container);
    }
  `,
  imports: [RouterModule, NgOptimizedImage, MatDividerModule, NavbarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  title = 'Binance Pulse';
}
