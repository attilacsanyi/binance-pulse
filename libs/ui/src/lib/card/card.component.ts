import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { cardVariants, type CardVariants } from './card.variants';

@Component({
  selector: 'bp-card',
  standalone: true,
  template: `
    <article [class]="styles().root()">
      <ng-content />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  readonly variant = input<CardVariants['variant']>('outlined');

  styles() {
    return cardVariants({ variant: this.variant() });
  }
}

@Component({
  selector: 'bp-card-header',
  standalone: true,
  template: `<header [class]="styles().header()"><ng-content /></header>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderComponent {
  styles() {
    return cardVariants({});
  }
}

@Component({
  selector: 'bp-card-title',
  standalone: true,
  template: `<h2 [class]="classes()"><ng-content /></h2>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTitleComponent {
  readonly size = input<'sm' | 'md' | 'lg'>('lg');

  classes() {
    const sizeClasses = {
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl',
    };
    return `${cardVariants({}).title()} ${sizeClasses[this.size()]}`;
  }
}

@Component({
  selector: 'bp-card-content',
  standalone: true,
  template: `<div [class]="styles().content()"><ng-content /></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardContentComponent {
  styles() {
    return cardVariants({});
  }
}

@Component({
  selector: 'bp-card-actions',
  standalone: true,
  template: `<footer [class]="classes()"><ng-content /></footer>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardActionsComponent {
  readonly align = input<CardVariants['actionsAlign']>('end');

  classes() {
    return cardVariants({ actionsAlign: this.align() }).actions();
  }
}
