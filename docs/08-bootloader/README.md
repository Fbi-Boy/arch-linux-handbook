---
id: 08-bootloader
slug: /08-bootloader
---

# 08 — Bootloader

## Choices
The handbook documents multiple valid paths:
- systemd-boot for a simple UEFI-oriented design
- GRUB for broader configuration and multi-platform scenarios

## Requirements
- UEFI mode confirmed
- EFI System Partition identified
- kernel and initramfs available
- CPU microcode selected when applicable

## Dual-boot gate
If Windows exists, preserve its EFI files and verify the Windows Boot Manager entry before rebooting.

## Recovery
If firmware cannot find Arch:
1. Boot the installation medium.
2. Mount the target root and EFI partition.
3. Enter the installed environment.
4. Inspect EFI files and firmware entries.
5. Repair or reinstall the selected bootloader according to its current upstream procedure.
6. Rebuild initramfs only when diagnosis requires it.

Never delete EFI files merely because a boot entry is missing.
