import { tv } from 'tailwind-variants';

export const autocompleteVariants = tv({
  slots: {
    root: 'relative',
    label: 'mb-1 block text-sm font-medium text-on-surface',
    inputWrapper: 'relative flex items-center',
    input:
      'w-full rounded border border-border bg-surface px-3 py-2 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
    spinnerWrapper: 'absolute right-3 top-1/2 -translate-y-1/2',
    listbox:
      'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border border-border bg-surface shadow-lg',
    option:
      'cursor-pointer px-3 py-2 text-on-surface hover:bg-surface-variant data-[active]:bg-surface-variant',
  },
});
