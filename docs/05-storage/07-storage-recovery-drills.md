---
title: Storage Recovery Drills
sidebar_label: Storage Recovery Drills
---

## Purpose

Recovery documentation should describe evidence and decision points, not only repair commands. These drills cover common storage failure classes without encouraging blind formatting.

## Drill A: Filesystem will not mount

Collect evidence:

```bash
lsblk -f
findmnt
sudo blkid
journalctl -b -k | tail -n 100
```

Identify the exact device and filesystem before running repair tools.

For ext4, repair should be performed on an unmounted filesystem:

```bash
sudo e2fsck -f /dev/DEVICE
```

Never substitute a device path from memory.

## Drill B: Btrfs reports errors

Start read-only:

```bash
sudo btrfs filesystem show
sudo btrfs filesystem usage /mountpoint
sudo btrfs device stats /mountpoint
sudo btrfs scrub status /mountpoint
```

Separate filesystem health from snapshot availability. A snapshot is not an independent backup.

## Drill C: LUKS device is not available

Inspect the block topology:

```bash
lsblk -f
sudo cryptsetup status cryptroot
sudo cryptsetup luksDump /dev/DEVICE
```

Do not run formatting or header-destructive commands during diagnosis.

If the encrypted device is healthy and the recovery key is available, unlock it using the documented mapping and inspect the filesystem layer above it.

## Drill D: Root filesystem recovery from live media

Boot the live environment in the same firmware mode as the installed system. Identify root and ESP:

```bash
lsblk -f
```

Mount only after the correct partitions are identified, then use `arch-chroot` for package, initramfs, or bootloader repairs.

## Verification

A recovery is incomplete until:

```bash
findmnt -R /mnt
lsblk -f
```

show the expected topology and the installed system can proceed to the next recovery stage.

## Stop conditions

Stop when device identity is uncertain, the filesystem is mounted while a tool requires it unmounted, an encryption header may be damaged, or recovery would overwrite evidence.

## References

- [ArchWiki: File systems](https://wiki.archlinux.org/title/File_systems)
- [ArchWiki: Btrfs](https://wiki.archlinux.org/title/Btrfs)
- [ArchWiki: dm-crypt/Encrypting an entire system](https://wiki.archlinux.org/title/Dm-crypt/Encrypting_an_entire_system)
