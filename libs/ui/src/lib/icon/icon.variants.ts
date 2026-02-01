import { tv, type VariantProps } from 'tailwind-variants';

export const iconVariants = tv({
  base: '',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    animate: {
      none: '',
      spin: 'animate-spin',
      pulse: 'animate-pulse',
      bounce: 'animate-bounce',
    },
  },
  defaultVariants: {
    size: 'md',
    animate: 'none',
  },
});

export type IconVariants = VariantProps<typeof iconVariants>;
