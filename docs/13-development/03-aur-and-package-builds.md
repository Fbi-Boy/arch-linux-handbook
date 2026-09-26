---
title: AUR and Package Builds
---

The Arch User Repository contains community-maintained build descriptions. AUR packages are unofficial and must be inspected before building.

## Prefer official repositories

Before using the AUR:

```bash
pacman -Ss PACKAGE
pacman -Si PACKAGE
```

If an equivalent package is available from an official repository, evaluate that option first.

## Inspect a PKGBUILD

Clone or download the package source, then inspect:

```bash
less PKGBUILD
makepkg --printsrcinfo
```

Look for:

- unexpected network access;
- unfamiliar install scripts;
- source URLs;
- patches;
- elevated commands;
- dependencies;
- maintainer and update history.

## Build as a normal user

Do not build AUR packages as root.

```bash
makepkg -si
```

Review the generated package before installation when the package or source is unfamiliar.

## Update discipline

AUR packages can require manual intervention after dependency or toolchain changes. Read the package changes and relevant Arch news before rebuilding a package that has stopped working.

## Recovery

If an AUR package breaks:

1. identify the package and version;
2. inspect its PKGBUILD and build logs;
3. determine whether the failure is source, dependency, compiler, or packaging related;
4. check for an official repository alternative;
5. remove or rebuild only after preserving useful logs.

## References

- https://wiki.archlinux.org/title/Arch_User_Repository
- https://wiki.archlinux.org/title/Arch_User_Repository#AUR_submission_guidelines
- https://wiki.archlinux.org/title/Makepkg
