---
id: base-install
title: Install the base system
sidebar_label: Base system
---

# Install the base system

The base installation stage turns the mounted target filesystem into a bootable Arch userspace.

## 1. Final mount verification

Before `pacstrap`:

```bash
findmnt -R /mnt
lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINTS
```

The root filesystem must be mounted at `/mnt`.

## 2. Bootstrap packages

A minimal useful baseline is:

```bash
pacstrap -K /mnt base linux linux-firmware networkmanager
```

Add CPU microcode appropriate to the processor:

### AMD

```bash
pacstrap -K /mnt amd-ucode
```

### Intel

```bash
pacstrap -K /mnt intel-ucode
```

Add packages required by the chosen filesystem, storage, bootloader, or later desktop design only when those requirements have been decided.

## Why `-K`?

Current Arch tooling documents `pacstrap -K` as initializing a new pacman keyring for the target installation instead of relying on the host keyring.

## 3. Generate fstab

Generate filesystem table entries from the mounted system:

```bash
genfstab -U /mnt >> /mnt/etc/fstab
```

Inspect the result:

```bash
cat /mnt/etc/fstab
```

Do not blindly append the command multiple times. Repeated generation can create duplicate entries.

## 4. Enter the installed system

```bash
arch-chroot /mnt
```

You are now operating inside the target installation.

Confirm:

```lsblk
mount
```

## Installation gate

At this point:

- kernel exists under the target filesystem,
- base userspace is installed,
- firmware package is installed,
- network manager package is present if selected,
- fstab exists,
- root filesystem is accessible from the chroot.

## Next stages

Continue with:

1. timezone and clock,
2. locale,
3. hostname,
4. users and privileges,
5. network service,
6. bootloader,
7. initramfs/filesystem-specific configuration,
8. pre-reboot verification.

## References

- ArchWiki: Installation guide
- ArchWiki: pacstrap
