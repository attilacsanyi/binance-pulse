import { tv, type VariantProps } from 'tailwind-variants';

export const buttonVariants = tv({
  base: 'inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      primary:
        'bg-primary text-white hover:bg-primary-hover focus:ring-primary',
      accent: 'bg-accent text-white hover:bg-accent-hover focus:ring-accent',
      ghost: 'bg-transparent text-on-surface hover:bg-surface-variant',
      outline:
        'border border-border bg-transparent text-on-surface hover:bg-surface-variant',
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
