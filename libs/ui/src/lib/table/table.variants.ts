import { tv } from 'tailwind-variants';

export const tableVariants = tv({
  slots: {
    root: 'w-full',
    headerRow: '',
    headerCell: 'px-4 py-2 text-left text-sm font-semibold text-on-surface',
    bodyRow: 'text-sm text-on-surface',
    bodyCell: 'px-4 py-1',
    title: 'mb-4 pl-4 text-lg font-bold text-on-surface',
  },
});
