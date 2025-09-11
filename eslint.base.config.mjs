import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          depConstraints: [
            {
              sourceTag: 'app',
              onlyDependOnLibsWithTags: ['core', 'layout', 'feature'],
            },
            {
              sourceTag: 'core',
              onlyDependOnLibsWithTags: [],
            },
            {
              sourceTag: 'layout',
              onlyDependOnLibsWithTags: ['core', 'pattern', 'ui'],
            },
            {
              sourceTag: 'feature',
              onlyDependOnLibsWithTags: ['core', 'pattern', 'ui'],
            },
            {
              sourceTag: 'pattern',
              onlyDependOnLibsWithTags: ['core', 'ui'],
            },
            {
              sourceTag: 'ui',
              onlyDependOnLibsWithTags: [],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'bp',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'bp',
          style: 'kebab-case',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
  // {
  //   files: ['**/*.html'],
  //   rules: {
  //     // Prefer using prettier for attribute order
  //     '@angular-eslint/template/attributes-order': 'off',
  //   },
  // },
];
