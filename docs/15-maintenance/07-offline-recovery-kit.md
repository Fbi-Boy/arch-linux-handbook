---
title: Offline Recovery Kit
---

## Purpose

Prepare a small recovery kit before a system failure makes normal package installation or network access unavailable.

## What must be true first

Identify the target machine, its boot mode, storage layout, filesystem, and recovery media.

`lsblk -f`
`findmnt -R /`
`test -d /sys/firmware/efi && echo "UEFI" || echo "Legacy/unknown"`
`uname -r`

## Recommended kit

Keep access to a current Arch installation medium, a known-good network path or offline documentation copy, filesystem and disk identification notes, securely stored encryption recovery material, important configuration backups, and a package inventory when practical.

Never store recovery keys in the same location as the device they unlock.

## Recovery sequence

Use the smallest recovery environment that provides the required tools:

**Preserve → Identify → Mount → Chroot → Repair → Verify**

Before changing storage, capture:

`lsblk -f`
`blkid`
`findmnt -R /mnt`

Mount the intended root filesystem and ESP only after identifying them from filesystem labels, UUIDs, and sizes.

## Package recovery

If networking works in the live environment, repair from authoritative repositories rather than downloading arbitrary package files.

`pacman -Syu`

## Boot recovery

After mounting the installed system, enter it with `arch-chroot` and inspect:

`bootctl status`
`findmnt /efi`
`ls /boot`

Rebuild only the layer that evidence identifies as broken.

## Verification

Before rebooting:

- root and ESP mounts are correct;
- `/etc/fstab` matches the actual storage layout;
- kernel and initramfs exist;
- the boot entry points to the intended installation;
- networking is configured if required after reboot.

## Recovery rule

Do not format a disk, partition, or EFI System Partition merely because the machine does not boot.

## References

- [ArchWiki Installation guide](https://wiki.archlinux.org/title/Installation_guide)
- [ArchWiki Chroot](https://wiki.archlinux.org/title/Chroot)
- [ArchWiki Systemd-boot](https://wiki.archlinux.org/title/Systemd-boot)
