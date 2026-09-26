---
title: LUKS Encryption Strategy
sidebar_label: LUKS Encryption
---

## Purpose

This guide explains how to choose and reason about block-device encryption with dm-crypt and LUKS. It is intentionally decision-oriented: encryption changes recovery procedures, boot dependencies, and the consequences of losing credentials.

ArchWiki identifies dm-crypt as Linux's standard device-mapper encryption functionality and LUKS as the default convenience layer for dm-crypt. Use the official documentation as the authority for exact options.

## Decision point

Choose the smallest design that satisfies the threat model:

| Requirement | Pattern |
| --- | --- |
| Protect a secondary data partition | LUKS on the data partition |
| Protect the whole Linux root filesystem | LUKS root |
| Need flexible filesystem layout | LUKS + LVM or LUKS + Btrfs subvolumes |
| Need Secure Boot / TPM integration | Treat boot integrity and encryption as one architecture |
| Need dual boot | Keep the existing Windows ESP intact and document recovery paths |

Do not treat encryption as a replacement for backups. Encryption protects confidentiality; it does not recover deleted, corrupted, or overwritten data.

## Preflight

Before changing storage:

```bash
lsblk -f
lsblk -o NAME,SIZE,TYPE,FSTYPE,MOUNTPOINTS,MODEL
findmnt -R /
```

Record the target device, filesystem, UUIDs, mount points, and backup status.

For an existing disk, stop if the target device cannot be identified unambiguously.

## LUKS lifecycle

The conceptual lifecycle is:

**Identify → Format → Unlock → Mount → Verify → Backup → Recover**

A new LUKS container is destructive to existing data on the target device. A typical new container is created with:

```bash
sudo cryptsetup luksFormat /dev/DEVICE
sudo cryptsetup open /dev/DEVICE cryptroot
```

Then create the filesystem on the unlocked mapping:

```bash
sudo mkfs.ext4 /dev/mapper/cryptroot
sudo mount /dev/mapper/cryptroot /mnt
```

Never substitute a real device until `lsblk -f` and the partitioning plan prove it is the intended target.

## Inspect before changing

Useful inspection commands:

```bash
sudo cryptsetup luksDump /dev/DEVICE
sudo cryptsetup status cryptroot
ls -l /dev/mapper/
lsblk -f
```

Do not paste secrets, recovery keys, or passphrases into documentation, shell history, issues, or commits.

## Boot dependency

Encrypted root adds a dependency chain:

**Firmware → bootloader/UKI → initramfs → unlock LUKS → discover root → mount root → userspace**

Arch's full-system encryption guidance documents LUKS2, encrypted root, and the corresponding boot/initramfs configuration. Exact parameters depend on the chosen initramfs and boot architecture.

For an existing encrypted installation, inspect before repairing:

```bash
lsblk -f
sudo cryptsetup luksDump /dev/DEVICE
cat /etc/crypttab
cat /etc/fstab
cat /proc/cmdline
```

## Recovery

From an Arch ISO, the recovery pattern is:

```bash
lsblk -f
sudo cryptsetup open /dev/DEVICE cryptroot
sudo mount /dev/mapper/cryptroot /mnt
```

Continue with the filesystem and bootloader recovery procedure appropriate to the installation.

If the LUKS header is damaged, stop before attempting write operations. Header backup and recovery planning must exist before a failure occurs.

## Stop conditions

Stop and reassess when:

- the target device is ambiguous;
- the only copy of important data is on the target;
- the LUKS passphrase/key is unavailable;
- the boot architecture is unknown;
- recovery media cannot access the installed system;
- a proposed command would overwrite a partition or LUKS header.

## References

- [ArchWiki: Data-at-rest encryption](https://wiki.archlinux.org/title/Data-at-rest_encryption)
- [ArchWiki: dm-crypt / full-system encryption](https://wiki.archlinux.org/title/Dm-crypt/Encrypting_an_entire_system)
- [ArchWiki: non-root filesystem encryption](https://wiki.archlinux.org/title/Dm-crypt/Encrypting_a_non-root_file_system)
