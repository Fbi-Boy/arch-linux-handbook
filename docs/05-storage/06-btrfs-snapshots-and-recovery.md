---
title: Btrfs Snapshots and Recovery
sidebar_label: Btrfs Recovery
---

## Purpose

Btrfs snapshots can make rollback workflows faster, but a snapshot is not an independent backup. A snapshot shares the same underlying storage and can be lost with the filesystem.

## Mental model

Separate four concepts:

1. **Snapshot** — point-in-time filesystem state on the same storage.
2. **Backup** — an independent copy on another failure domain.
3. **Rollback** — changing which filesystem state is presented as the active system.
4. **Recovery** — restoring a usable system after corruption, boot failure, or storage loss.

Do not use the word “backup” for a snapshot.

## Preflight

Inspect the filesystem before making changes:

```bash
findmnt -t btrfs
sudo btrfs filesystem show
sudo btrfs filesystem usage /
sudo btrfs subvolume list /
```

Record the subvolume layout and mount options before attempting a rollback.

## Snapshot strategy

A maintainable layout usually separates system and user data with subvolumes, for example:

```text
@        system root
@home    user data
@srv     service data (optional)
@snapshots snapshot storage (optional)
```

The exact layout is a design choice, not a universal requirement.

## Create a snapshot

From a Btrfs filesystem:

```bash
sudo btrfs subvolume snapshot -r / /path/to/snapshot
```

Use a dedicated snapshot location and naming convention in production. Verify that the snapshot was actually created:

```bash
sudo btrfs subvolume list /
```

## Rollback principle

Never start a rollback by deleting the current root.

Use:

### Rollback flow

Inspect → snapshot → test → select rollback target → preserve current state → switch → boot → verify

A failed rollback is easier to recover when the previous state remains available.

## Boot failure after a change

First determine whether the failure is:

- bootloader/ESP;
- kernel/initramfs;
- root discovery;
- filesystem mount;
- userspace configuration.

If the system reaches an initramfs or live environment, inspect:

```bash
lsblk -f
sudo btrfs filesystem show
sudo btrfs subvolume list /mnt
```

Do not run filesystem repair merely because boot failed. First establish whether the filesystem itself is reporting errors.

## Filesystem health

For an unmounted filesystem, filesystem checking can be considered according to the filesystem's documented procedure. Avoid repair commands against a mounted root filesystem unless the tool explicitly supports that operation and the situation warrants it.

For Btrfs, prefer evidence from:

```bash
sudo btrfs device stats /
sudo btrfs filesystem usage /
journalctl -b -p err..alert
```

## Snapshot retention

Retention should be tied to recovery objectives:

| Need | Example policy |
| --- | --- |
| Quick rollback after updates | Keep recent snapshots |
| Recover from accidental deletion | Keep snapshots longer than the mistake window |
| Hardware failure | Independent backup required |
| Disaster recovery | Backup outside the affected device |

## Stop conditions

Stop before rollback when:

- the snapshot target is not identified;
- no independent backup exists for important data;
- the current state has not been preserved;
- the filesystem reports hardware/storage errors;
- the proposed repair would destroy the only known-good state.

## References

- [ArchWiki: Btrfs](https://wiki.archlinux.org/title/Btrfs)
- [ArchWiki: File systems](https://wiki.archlinux.org/title/File_systems)
