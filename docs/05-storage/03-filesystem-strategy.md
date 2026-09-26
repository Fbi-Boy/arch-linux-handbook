---
title: Filesystem Strategy
---

A filesystem choice should follow workload, recovery needs, tooling, and operational familiarity rather than a universal “best” answer.

## Decision

| Need | Consider |
| --- | --- |
| Simple general-purpose Linux system | ext4 |
| Snapshots and advanced filesystem features | Btrfs |
| Shared removable media | exFAT |
| EFI System Partition | FAT32/VFAT |

Arch supports many filesystems; verify current kernel and userspace support before choosing. The ArchWiki filesystem reference is the authority for current details.

## ext4 baseline

For a conventional root filesystem, ext4 keeps the operational model simple:

```bash
sudo mkfs.ext4 /dev/ROOT_PARTITION
sudo e2fsck -f /dev/ROOT_PARTITION
```

Do not run filesystem creation or repair commands until the target device has been positively identified.

## Btrfs baseline

Btrfs provides features such as subvolumes and snapshots, but those features introduce additional design and recovery decisions.

Inspect before acting:

```bash
lsblk -f
findmnt
sudo btrfs filesystem show
```

Do not add a snapshot strategy without also defining retention, storage location, and recovery testing.

## Verification gate

After creating or mounting a filesystem:

```bash
lsblk -f
findmnt -R /mnt
findmnt --verify --verbose
```

Record filesystem type, UUID, mountpoint, and intended role before continuing.

## Recovery rule

A filesystem that is “supported” is not automatically recoverable from every failure. Keep a tested backup independent of the filesystem's snapshot mechanism.

## References

- https://wiki.archlinux.org/title/File_systems
- https://wiki.archlinux.org/title/Ext4
- https://wiki.archlinux.org/title/Btrfs
