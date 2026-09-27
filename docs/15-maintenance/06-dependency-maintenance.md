---
title: Dependency Maintenance
---

## Purpose

Keep the documentation site and its automation dependencies current without turning routine updates into uncontrolled breaking changes.

## What must be true first

- The repository is clean or the change is isolated in a maintenance branch.
- The current production build is known to pass.
- Dependency changes are reviewed as code changes, not accepted blindly.

## Maintenance policy

The project uses automated update proposals for npm dependencies and GitHub Actions used by repository automation.

Update proposals should remain small and reviewable. Do not combine unrelated dependency upgrades with documentation changes.

## Safe update workflow

Inspect the proposed change, install dependencies, run the production build, and review the resulting package metadata before merging.

`npm install`
`npm run build`

## Security advisories

A vulnerability report is a signal to investigate, not a reason to apply a blind force upgrade. Determine which package introduces the advisory, whether it is direct or transitive, whether the affected code path is used, whether an upstream compatible fix exists, and whether the proposed upgrade changes the supported Docusaurus or Node.js range.

Record the reasoning in the pull request.

## Recovery

If an update breaks the site, preserve the CI output, identify the first changed dependency, revert or pin only the affected change, restore the last known-good build, and open a focused follow-up update.

Do not disable CI to make a dependency update appear successful.

## Verification

A maintenance change is ready when Documentation Quality, Link Check, and Documentation Site all pass and no unexplained route or rendering regression remains.

## References

- [ArchWiki System maintenance](https://wiki.archlinux.org/title/System_maintenance)
- [ArchWiki Pacman](https://wiki.archlinux.org/title/Pacman)
- [Docusaurus deployment documentation](https://docusaurus.io/docs/deployment)
