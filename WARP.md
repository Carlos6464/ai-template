# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project overview

This repository is an Nx workspace scaffold with no application or library projects created yet. It is ready to host multiple JS/TS projects (apps and libs) managed by Nx.

Key characteristics:
- Nx CLI is used via `npx nx ...` (no custom npm scripts are defined yet).
- Nx Cloud is configured (see `nx.json`), but its distributed execution in CI is currently commented out.
- Projects will be added over time using Nx generators and/or `project.json`/`package.json` configuration files.

## Tooling and environment

- Node tooling is managed via npm (`package-lock.json` present).
- Nx version is pinned in `package.json` (`nx`, `@nx/js`, `@nx/workspace`).
- Editor configuration is standardized via `.editorconfig`.
- VS Code setup is guided by `.vscode/extensions.json`, which recommends:
  - `nrwl.angular-console` (Nx Console) for running tasks and code generation.
  - `esbenp.prettier-vscode` for formatting.

## Common commands

All commands assume execution from the repository root.

### Install dependencies

- First-time setup / local development:
  - `npm install`
- CI installs dependencies with:
  - `npm ci`

### Discover projects and graph

Use Nx to understand the workspace as projects are added:
- Visual dependency graph:
  - `npx nx graph`

### Run tasks for a single project

Nx tasks are generally invoked as:
- `npx nx <target> <project-name>`

Examples (once projects exist with the corresponding targets):
- Build a project:
  - `npx nx build myproject`
- Lint a project:
  - `npx nx lint myproject`
- Test a project:
  - `npx nx test myproject`

### Run tasks across many projects

CI demonstrates the canonical way to run common targets across all projects that define them:
- Lint, test, and build all relevant projects:
  - `npx nx run-many -t lint test build`

### Running a single test

Nx forwards arguments after `--` to the underlying test runner. For a project named `myproject`, examples with a Jest-style runner are:
- Run a single test file:
  - `npx nx test myproject -- --testFile=path/to/file.spec.ts`
- Run tests matching a name pattern:
  - `npx nx test myproject -- --testNamePattern="my test name"`

Adjust the arguments according to the configured test runner for each project.

### CI-related commands

The GitHub Actions workflow (`.github/workflows/ci.yml`) uses:
- `npx nx run-many -t lint test build` — main CI task runner across projects.
- `npx nx fix-ci` — Nx Cloud helper to suggest fixes for common CI issues.

Distributed task execution via Nx Cloud is scaffolded but commented out. To enable it, you would uncomment the `npx nx start-ci-run` step in the workflow.

## Architecture and structure

### Nx configuration (`nx.json`)

`nx.json` defines global Nx behavior:
- References the workspace schema from `./node_modules/nx/schemas/nx-schema.json`.
- Configures `namedInputs`:
  - `default`: includes all files under `{projectRoot}` plus `sharedGlobals`.
  - `production`: currently identical to `default`.
  - `sharedGlobals`: includes `.github/workflows/ci.yml`, so changes to CI are part of the task hashing for all projects.
- Contains an `nxCloudId`, tying the workspace to an Nx Cloud instance for caching and (optionally) distributed execution.

This means task caching and invalidation are driven both by project-local sources and the shared CI workflow file.

### Root package definition (`package.json`)

The root `package.json`:
- Names the workspace package `@ai-template/source` and marks it `private`.
- Declares Nx-related dev dependencies (`nx`, `@nx/js`, `@nx/workspace`).
- Does not define any npm `scripts`; all task orchestration is expected through `npx nx ...`.

As projects are added, each will typically have its own `project.json` (and possibly `package.json`) defining targets like `build`, `lint`, and `test` that Nx can invoke.

### Continuous Integration (`.github/workflows/ci.yml`)

The GitHub Actions workflow:
- Triggers on pushes to `main` and on pull requests.
- Sets up Node 20 with npm caching and runs `npm ci`.
- Runs Nx tasks across projects: `npx nx run-many -t lint test build`.
- Always runs `npx nx fix-ci` at the end to help diagnose and stabilize CI.

Nx Cloud integration is scaffolded for distributed execution but not enabled by default (the `nx start-ci-run` step is commented out).

### Editor and formatting configuration

- `.editorconfig` enforces:
  - UTF-8 charset.
  - 2-space indentation and trailing-whitespace trimming by default.
  - For `*.md`, trailing whitespace is preserved and line length is not enforced.
- `.vscode/extensions.json` recommends installing Nx Console and Prettier to streamline running Nx tasks and maintaining consistent formatting.

## Nx workspace evolution

As you add applications and libraries with Nx generators (for example, via `npx nx add <plugin>` and `npx nx g ...` as described in `README.md`), new `project.json` files and source directories will appear. When working in this repository:
- Prefer invoking builds, tests, and linting via `npx nx ...` instead of calling underlying tools directly.
- Use `npx nx graph` and the CI workflow as the source of truth for how projects relate and which targets are expected to exist.