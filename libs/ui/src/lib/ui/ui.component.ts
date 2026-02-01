import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bp-ui',
  imports: [],
  template: `<p>Ui works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiComponent {}
