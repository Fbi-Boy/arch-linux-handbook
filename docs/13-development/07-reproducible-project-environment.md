---
title: Reproducible Project Environment
---

## Purpose

Keep development projects reproducible across machines without turning the operating system into an undocumented collection of global packages.

## What must be true first

Separate system tools from project dependencies.

- System packages provide the OS and core toolchain.
- Project manifests define application dependencies.
- Repository documentation defines required versions or compatibility ranges.
- Environment-specific secrets stay outside Git.

## Project baseline

For each project, record language/runtime, package manager, supported version range, build command, test command, formatter/linter, environment variables, and external services.

Prefer project-local dependency management where the ecosystem supports it.

## Git hygiene

Before committing:

`git status`
`git diff`
`git diff --check`

Never commit passwords, private keys, access tokens, production credentials, or machine-specific secrets.

## Environment files

Keep secret-bearing files outside version control. Commit a safe example that documents variable names without real credentials when the project needs one.

## Verification

A new machine should be able to answer:

1. What runtime is required?
2. How are dependencies installed?
3. How is the project built?
4. How is it tested?
5. Which configuration is required?
6. Which values are secret?

## Recovery

If a project works only because of undocumented global state, inventory the environment and move the missing dependency into the project's documented setup.

## References

- [ArchWiki General recommendations](https://wiki.archlinux.org/title/General_recommendations)
- [ArchWiki Environment variables](https://wiki.archlinux.org/title/Environment_variables)
