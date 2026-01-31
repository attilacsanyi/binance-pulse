# Release guide

This project uses [Nx Release](https://nx.dev/docs/guides/nx-release) for versioning, changelog, and GitHub releases. Git tags follow the format **`release-v{version}`** (e.g. `release-v0.2.0`).

---

## Creating a new release (usual flow)

Use this when you already have at least one tag like `release-v0.2.0` and want to cut a new version from the current branch.

1. **Ensure conventional commits**  
   All commits since the last tag should follow [Conventional Commits](https://www.conventionalcommits.org/) (e.g. `feat:`, `fix:`, `chore:`). Nx uses them to bump the version and generate the changelog.

2. **Dry run**

   ```bash
   pnpm exec nx release -d
   ```

   Check the proposed version and changelog.

3. **Run release**

   ```bash
   pnpm exec nx release
   ```

   Nx will:

   - Bump the version (e.g. in `package.json`)
   - Update `CHANGELOG.md`
   - Create a git tag `release-v{X.Y.Z}`
   - Optionally create a GitHub release (if configured)

4. **Push branch and tags**
   ```bash
   git push origin main
   git push origin --tags
   ```
   Use your actual branch name instead of `main` if different.

You **do not** create the tag yourself in this flow; Nx creates it.

---

## When you need to create a tag manually

Create a tag yourself only in these cases:

- **First release ever** – You have no `release-v*` tags yet and want to mark a specific commit (e.g. an existing release) as the base.
- **Syncing an old release** – You already released a version (e.g. 0.2.0) without Nx and want Nx to treat that commit as `release-v0.2.0` so future `nx release` runs use it as the previous version.

In both cases you are “teaching” Nx where the current release is by creating a tag in the format Nx expects.

---

## Creating a tag manually (first release or syncing)

Use this only when you need to introduce or fix a `release-v*` tag at a specific commit (e.g. `5adc53c` for 0.2.0).

1. **Remove wrong or old tags (if any)**

   - Local: `git tag -d 0.2.0` or `git tag -d release-v0.2.0`
   - Remote (only if you already pushed that tag):  
     `git push origin :refs/tags/0.2.0` or  
     `git push origin :refs/tags/release-v0.2.0`

2. **Create the tag in Nx’s format**  
   Replace `X.Y.Z` and `<commit-hash>` with your version and commit:

   ```bash
   git tag -a release-vX.Y.Z <commit-hash> -m "Release X.Y.Z"
   ```

   Example:

   ```bash
   git tag -a release-v0.2.0 5adc53c -m "Release 0.2.0"
   ```

3. **Push the tag**

   ```bash
   git push origin release-vX.Y.Z
   ```

   Example:

   ```bash
   git push origin release-v0.2.0
   ```

4. **From here on**  
   Use the [usual flow](#creating-a-new-release-usual-flow): run `pnpm exec nx release -d` then `pnpm exec nx release` when you want the next version. Nx will see `release-vX.Y.Z` and compute the next version from it.

---

## Quick reference

| Situation                         | Create tag yourself? | What to run                                                   |
| --------------------------------- | -------------------- | ------------------------------------------------------------- |
| Next release (tags already exist) | No                   | `nx release -d` then `nx release`, then push                  |
| First release / sync old release  | Yes                  | Create `release-vX.Y.Z` at commit, push, then use normal flow |

Tag format: **`release-v{version}`** (e.g. `release-v0.3.0`). The `release` prefix comes from the release group name in `nx.json` (`release.groups.release`).
