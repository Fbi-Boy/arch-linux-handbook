---
title: Release and Readiness
sidebar_label: Release and Readiness
---

## Purpose

Use this gate before treating the handbook as a stable release baseline.

## Release definition

Version 1.0.0 is ready when the content, safety, navigation, accessibility, design, and build gates pass together.

## Content gate

- Installation path is complete from preparation to first boot.
- Major hardware, network, desktop, security, development, maintenance, and recovery paths exist.
- Destructive commands include verification context.
- Recovery procedures preserve evidence before repair.
- High-risk procedures have authoritative references.

## Repository gate

- README describes the current release state.
- CHANGELOG records the release scope.
- CONTRIBUTING and SECURITY documents exist.
- License is explicit.
- Sidebar IDs resolve.
- Local Markdown links resolve.
- No stale placeholder text remains in public-facing release material.

## Site gate

- Docusaurus production build succeeds.
- Search entry is present.
- Light and dark themes remain readable.
- Mobile navigation remains usable.
- Code blocks and tables remain readable at narrow widths.
- Images have meaningful alternative text.
- Navigation starts from a clear installation and recovery entry point.

## CI gate

Run the same production checks used by the repository:

```bash
npm install
npm run build
```

The repository CI additionally validates Markdown quality and links.

## Maintenance gate

After release:

1. Review high-risk ArchWiki references when upstream procedures change.
2. Correct broken links promptly.
3. Treat technical corrections as targeted maintenance changes.
4. Avoid broad expansion unless a real documentation gap is demonstrated.
5. Record user-visible changes in `CHANGELOG.md`.

## Release principle

The goal of v1.0.0 is not to document every possible Arch Linux configuration. It establishes a coherent, safe, maintainable baseline that can evolve without losing its quality gates.

## References

- [ArchWiki System maintenance](https://wiki.archlinux.org/title/System_maintenance)
- [Docusaurus configuration](https://docusaurus.io/docs/configuration)
