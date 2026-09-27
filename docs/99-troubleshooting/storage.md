---
title: Storage Troubleshooting
sidebar_label: Storage
---

## Classify the failure

Separate device detection, partition visibility, filesystem recognition, encryption mapping, mount failure, filesystem corruption, and capacity exhaustion.

Start with:

```bash
lsblk -f
findmnt
df -h
df -i
journalctl -b -k | tail -n 100
```

## Device is missing

Check whether the kernel sees the controller or device before attempting filesystem repair:

```bash
lsblk
lspci -k
dmesg --level=err,warn | tail -n 100
```

## Mount fails

Confirm filesystem type and UUID:

```bash
lsblk -f
sudo blkid
findmnt --verify --verbose
```

Do not format the device because a mount failed.

## Filesystem repair

Use the filesystem's documented repair tool and follow its mounted/unmounted requirements. For ext4:

```bash
sudo e2fsck -f /dev/DEVICE
```

For Btrfs, begin with read-only inspection and health information before repair operations.

## Capacity failure

```bash
df -h
df -i
sudo du -xhd1 / 2>/dev/null | sort -h
```

Distinguish blocks from inodes. Removing files does not solve inode exhaustion in the same way it solves block exhaustion.

## Recovery rule

Preserve important data before destructive repair. Identify the exact device, filesystem, and backup state before proceeding.

## References

- [ArchWiki: File systems](https://wiki.archlinux.org/title/File_systems)
- [ArchWiki: Btrfs](https://wiki.archlinux.org/title/Btrfs)
- [ArchWiki: SSD](https://wiki.archlinux.org/title/Solid_state_drive)
