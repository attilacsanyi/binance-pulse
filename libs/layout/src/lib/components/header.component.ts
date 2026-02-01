import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';

@Component({
  selector: 'bp-header',
  template: `
    <header class="shadow-xs">
      <div class="mx-auto max-w-7xl px-4 py-4">
        <div class="flex items-center">
          <img
            alt="Binance Pulse Logo"
            height="32"
            loading="eager"
            ngSrc="logo.png"
            routerLink="/"
            width="32"
            class="mr-4 cursor-pointer"
          />
          <h1 class="text-2xl font-bold">{{ title }}</h1>
        </div>
        <div class="my-4">
          <mat-divider />
        </div>
        <bp-navbar />
      </div>
    </header>
  `,
  host: {
    style: 'display: contents',
  },
  imports: [RouterModule, NgOptimizedImage, MatDividerModule, NavbarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  title = 'Binance Pulse';
}
