---
title: Navigation and Search
sidebar_label: Navigation and Search
---

## Purpose

Use this page when you are not sure where a task belongs in the handbook.

The handbook is organized around a practical lifecycle:

1. **Prepare** — establish hardware, firmware, network, backups, and installation constraints.
2. **Install** — partition, format, install the base system, configure identity, and make the system bootable.
3. **Configure** — add the desktop, hardware support, security controls, development tools, and maintenance routines.
4. **Troubleshoot** — classify a failure by layer before changing the system.
5. **Recover** — preserve evidence, repair the smallest failing layer, verify, and record the result.

## Where to start

| Situation | Start here | Next move |
| --- | --- | --- |
| New installation | [Preparation](../01-preparation/01-preparation.md) | Follow the installation path |
| Existing system will not boot | [Boot troubleshooting](../99-troubleshooting/boot.md) | Use the recovery path |
| No network | [Network troubleshooting](../99-troubleshooting/network.md) | Classify device, link, IP, route, DNS |
| Display or login failure | [Display troubleshooting](../99-troubleshooting/display.md) | Move from TTY to GPU/session layers |
| Package operation fails | [Package manager troubleshooting](../99-troubleshooting/package-manager.md) | Preserve package state and classify |
| Hardware behaves unexpectedly | [Hardware troubleshooting](../99-troubleshooting/hardware.md) | Detect → driver → firmware → service |
| Planning a maintenance window | [System maintenance](../15-maintenance/01-system-maintenance.md) | Update, verify, and keep recovery media ready |

## Search strategy

Search for the **symptom**, not only the component name.

Examples:

- `black screen`
- `wifi connected no internet`
- `pacman signature invalid`
- `bootctl entry missing`
- `bluetooth headset no audio`
- `high memory usage`

Then read the failure classification before running repair commands.

Docusaurus provides a navbar search entry, and its official search integration supports Algolia DocSearch. Search quality depends on the deployed index, so the handbook keeps navigation useful even when search is unavailable.

## Navigation contract

Every major technical page should make four things easy to find:

- **Why** the procedure exists.
- **Before you change anything** — prerequisites and safety gates.
- **Verify** — commands or observations proving the intended state.
- **Recover** — what to do when verification fails.

This keeps search from becoming a substitute for understanding.

## References

- [Docusaurus search](https://docusaurus.io/docs/search)
- [Docusaurus theme configuration](https://docusaurus.io/docs/api/themes/configuration)
