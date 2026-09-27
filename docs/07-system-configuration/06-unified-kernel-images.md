---
title: Unified Kernel Images
sidebar_label: Unified Kernel Images
---

## Purpose

A Unified Kernel Image combines the kernel, initramfs, kernel command line, and related boot data into an EFI executable.

## Decide first

Use a UKI when the boot architecture benefits from a single EFI artifact and its maintenance workflow is understood. Do not migrate a working system merely for novelty.

## Inspect the current boot model

~~~~bash
bootctl status
findmnt /efi
findmnt /boot
ls -la /efi/EFI/Linux 2>/dev/null
~~~~

Confirm the ESP location and current bootloader behavior.

## Build and verify

The exact build method depends on the chosen kernel-install or mkinitcpio workflow. After generation:

~~~~bash
ls -lh /efi/EFI/Linux
bootctl status
~~~~

Keep the existing working boot path until the new image has been tested.

## Secure Boot boundary

A UKI does not automatically configure Secure Boot. Signing, certificate enrollment, and verification remain separate trust steps.

~~~~bash
sbctl status
sbctl verify
~~~~

## Recovery

If a UKI fails to boot, return to the known-good boot entry, inspect the generated artifact and kernel command line, then rebuild after identifying the failing layer.

## References

- [ArchWiki: Unified kernel image](https://wiki.archlinux.org/title/Unified_kernel_image)
- [ArchWiki: systemd-boot](https://wiki.archlinux.org/title/Systemd-boot)
- [ArchWiki: Secure Boot](https://wiki.archlinux.org/title/Unified_Extensible_Firmware_Interface/Secure_Boot)
