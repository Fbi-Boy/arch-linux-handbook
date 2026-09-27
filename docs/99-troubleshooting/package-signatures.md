---
title: Package Signature Troubleshooting
sidebar_label: Package Signatures
---

## Classify the error

Signature failures can involve expired keys, missing keys, stale keyrings, damaged cache, incorrect time, or repository configuration.

~~~~bash
timedatectl status
pacman -V
pacman-key --list-keys
~~~~

## Do not disable verification

Signature verification is part of the package trust model. Do not use `SigLevel = Never` as routine repair.

## Time synchronization

~~~~bash
timedatectl status
timedatectl show -p NTPSynchronized --value
~~~~

Incorrect time can make valid signatures appear invalid.

## Cache boundary

If one package repeatedly fails verification while repository metadata is healthy, inspect the cached package and consider removing only that affected cache entry.

## Recovery gate

Capture the exact signature error before changing keys or cache. Preserve evidence, repair one layer, then retry the package operation.

## References

- [ArchWiki: Pacman/Package signing](https://wiki.archlinux.org/title/Pacman/Package_signing)
- [ArchWiki: pacman](https://wiki.archlinux.org/title/Pacman)
