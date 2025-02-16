import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'bp-root',
  template: `
    <div class="min-h-screen">
      <header class="shadow-sm">
        <div class="mx-auto max-w-7xl px-4 py-4">
          <div class="flex items-center">
            <img
              ngSrc="logo.png"
              alt="Binance Pulse Logo"
              class="mr-4"
              loading="eager"
              width="32"
              height="32"
            />
            <h1 class="text-2xl font-bold">{{ title }}</h1>
          </div>
        </div>
      </header>
      <main class="mx-auto max-w-7xl px-4 py-6">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  imports: [RouterModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Binance Pulse';
}
