---
title: Package Maintenance and Cleanup
sidebar_label: Package Maintenance and Cleanup
---

## Purpose

Maintenance should reduce accumulated risk without deleting information needed for recovery.

## Package inventory

~~~~bash
pacman -Qqe > ~/package-list.txt
pacman -Qqm > ~/aur-package-list.txt
~~~~

Keep these inventories with recovery records.

## Orphans

Inspect before removing:

~~~~bash
pacman -Qtdq
~~~~

Determine whether each package is truly unused before removal.

## Cache and logs

~~~~bash
du -sh /var/cache/pacman/pkg
paccache --dryrun
journalctl --disk-usage
~~~~

Cleanup should be deliberate. Keep rollback resources when they are useful.

## Filesystem capacity

~~~~bash
df -h
df -i
~~~~

Distinguish block exhaustion from inode exhaustion.

## Verification

~~~~bash
pacman -Qe | wc -l
systemctl --failed
df -h
journalctl -b -p err..alert
~~~~

Record the maintenance action and result.

## References

- [ArchWiki: pacman](https://wiki.archlinux.org/title/Pacman)
- [ArchWiki: System maintenance](https://wiki.archlinux.org/title/System_maintenance)
