import { tv, type VariantProps } from 'tailwind-variants';

export const cardVariants = tv({
  slots: {
    root: 'rounded bg-surface',
    header: 'mb-4',
    title: 'font-bold text-on-surface',
    content: 'text-on-surface',
    actions: 'mt-4 flex',
  },
  variants: {
    variant: {
      outlined: {
        root: 'border border-border p-4',
      },
      elevated: {
        root: 'shadow-lg p-4',
      },
      flat: {
        root: 'p-4',
      },
    },
    actionsAlign: {
      start: { actions: 'justify-start' },
      end: { actions: 'justify-end' },
      center: { actions: 'justify-center' },
    },
  },
  defaultVariants: {
    variant: 'outlined',
    actionsAlign: 'end',
  },
});

export type CardVariants = VariantProps<typeof cardVariants>;
