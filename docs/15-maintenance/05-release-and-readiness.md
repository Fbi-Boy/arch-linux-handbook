---
title: Release and Readiness
sidebar_label: Release and Readiness
---

## Purpose

Use this gate before treating the handbook as a stable release candidate.

## Content gate

- Installation path is complete from preparation to first boot.
- Major hardware, network, desktop, security, development, maintenance, and recovery paths exist.
- Destructive commands include verification context.
- Recovery procedures preserve evidence before repair.
- Official ArchWiki references are current enough for the documented procedure.

## Site gate

- Sidebar IDs resolve.
- Local Markdown links resolve.
- Docusaurus build succeeds.
- Search entry is present.
- Light and dark themes remain readable.
- Mobile navigation remains usable.
- Code blocks and tables remain readable at narrow widths.
- Images have meaningful alternative text.

## Technical gate

Verify the generated site with:

```bash
npm install
npm run build
```

For local development:

```bash
npm run start
```

Inspect the built output for broken routes and console errors before publishing.

## Maintenance gate

Before a release:

1. Review the ArchWiki references used by high-risk procedures.
2. Review installation and recovery commands.
3. Run the documentation quality workflow.
4. Run the link-check workflow.
5. Run the Docusaurus build workflow.
6. Review the complete change set.
7. Record the release scope in `CHANGELOG.md`.

## Release principle

A documentation release is ready when its **content, safety, navigation, accessibility, design, and build** gates all pass together.

## References

- [ArchWiki System maintenance](https://wiki.archlinux.org/title/System_maintenance)
- [Docusaurus configuration](https://docusaurus.io/docs/configuration)
