import path from 'path';

// Docs: https://github.com/lint-staged/lint-staged#example-use-relative-paths-for-commands
const getStagedFiles = (absolutePaths: string[]) => {
  const cwd = process.cwd();
  const relativePaths = absolutePaths.map(file => path.relative(cwd, file));
  return `${relativePaths.join(',')}`;
};

export default {
  '*.ts': (absolutePaths: string[]) =>
    `pnpm exec nx affected:lint --fix --parallel=true --maxParallel=3 --files ${getStagedFiles(absolutePaths)}`,
  '*': (absolutePaths: string[]) =>
    `pnpm exec nx format:write --files ${getStagedFiles(absolutePaths)}`,
};
