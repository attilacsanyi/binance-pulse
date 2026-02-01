import { tv, type VariantProps } from 'tailwind-variants';

export const dividerVariants = tv({
  base: 'border-0',
  variants: {
    orientation: {
      horizontal: 'w-full border-t border-divider my-4',
      vertical: 'h-6 w-px bg-divider self-center',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export type DividerVariants = VariantProps<typeof dividerVariants>;
