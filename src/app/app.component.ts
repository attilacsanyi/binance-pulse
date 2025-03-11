import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@bp/layout';

@Component({
  selector: 'bp-root',
  template: `
    <div class="min-h-screen">
      <bp-header />
      <main class="mx-auto max-w-7xl px-4 py-6">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  imports: [RouterOutlet, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
