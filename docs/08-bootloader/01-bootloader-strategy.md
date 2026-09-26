---
id: bootloader-strategy
title: Bootloader strategy
sidebar_label: Bootloader strategy
---

# Bootloader strategy

The bootloader connects UEFI firmware to the installed operating system. Choose it from firmware mode, storage architecture, multi-boot needs, and recovery requirements.

## Baseline

For modern UEFI systems, systemd-boot is a concise option because it is shipped with systemd and integrates directly with UEFI. Other valid choices include GRUB, rEFInd, Limine, and firmware-direct Unified Kernel Images.

## Decision table

| Situation | Consideration |
| --- | --- |
| Simple UEFI Linux | systemd-boot is concise |
| Complex multi-boot | compare bootloader capabilities |
| UKI workflow | systemd-boot integrates naturally |
| Legacy BIOS | use a BIOS-compatible bootloader |
| Secure Boot | plan signing and key management first |

## Recovery principle

Before rebooting, know where the EFI executable lives, which UEFI entry points to it, where kernel/initramfs live, and how to recover from installation media.

## References

- ArchWiki: systemd-boot
- ArchWiki: Arch boot process
- ArchWiki: Unified kernel image
