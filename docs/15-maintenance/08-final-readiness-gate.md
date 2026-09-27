---
title: Final Readiness Gate
---

## Purpose

Define the evidence required before calling a handbook release complete. This page separates product readiness from ongoing maintenance.

## Release gates

A release must satisfy all of these gates:

| Gate | Evidence |
| --- | --- |
| Content | Installation, configuration, hardware, security, development, maintenance, and recovery paths are present |
| Safety | Destructive operations include verification context and recovery guidance |
| Navigation | Sidebar and internal routes resolve |
| Quality | Documentation Quality passes |
| Links | Link Check passes |
| Site | Production Docusaurus build passes |
| Governance | Contribution, security, ownership, and PR guidance are present |
| Automation | CI uses least-privilege permissions and dependency updates are monitored |
| Release | Version, changelog, and release notes identify the same release state |

## Final verification

Run the local production check:

```bash
npm install
npm run build
```

Then inspect the generated site and confirm:

- the landing page loads;
- primary navigation reaches the intended sections;
- dark and light themes remain readable;
- code blocks are readable;
- recovery links are discoverable;
- images have meaningful alternative text;
- no placeholder or draft text remains.

## Release administration

The repository's code and documentation can be release-ready before a Git tag or GitHub Release is created.

When release administration is performed manually, point the tag at the exact commit that passed the final CI gates and use the matching version in the changelog.

Do not claim a release exists until the tag or release is actually visible in GitHub.

## Maintenance after release

Release completion does not freeze the handbook.

Track:

- ArchWiki and upstream changes;
- Docusaurus and Node.js compatibility;
- dependency advisories;
- broken external references;
- newly discovered hardware or recovery cases.

Use focused pull requests for maintenance changes and preserve the same quality gates.

## Definition of done

The handbook is considered complete for a release when every release gate has evidence and no known blocking defect remains.

After that point, new work should be treated as maintenance, expansion, or a new release rather than unfinished v1.0.0 work.

## References

- [ArchWiki General recommendations](https://wiki.archlinux.org/title/General_recommendations)
- [ArchWiki System maintenance](https://wiki.archlinux.org/title/System_maintenance)
- [Docusaurus deployment documentation](https://docusaurus.io/docs/deployment)
