---
title: Windows Dual Boot Safety
sidebar_label: Windows Dual Boot Safety
---

## Purpose

Install Arch beside Windows without confusing firmware mode, partitions, or the EFI System Partition (ESP).

ArchWiki documents Windows UEFI/GPT and legacy BIOS/MBR compatibility constraints. For modern Windows installations, verify the actual firmware mode before touching the disk.

## Before changing partitions

In Windows:

1. Confirm the current boot mode with System Information (`msinfo32`).
2. Back up important files.
3. Save the BitLocker recovery key if device encryption is active.
4. Suspend encryption protections as appropriate before changing firmware or Secure Boot configuration.
5. Disable Fast Startup if Linux will access shared Windows storage.

Secure Boot database changes can affect BitLocker PCR measurements, so preserve the recovery key before changing Secure Boot configuration.

## Firmware and partition rule

For a Windows installation using UEFI/GPT, keep Arch in the same UEFI/GPT model. Do not mix UEFI and legacy boot modes across operating systems in the same dual-boot design.

From the Arch live environment:

```bash
test -d /sys/firmware/efi && echo "UEFI mode"
lsblk -o NAME,SIZE,FSTYPE,TYPE,MOUNTPOINTS,MODEL
lsblk -f
```

Stop if the observed layout does not match the planned disk.

## ESP safety

The existing Windows ESP contains Windows boot files. Identify it by filesystem, partition type, size, and disk location before mounting.

Never format the existing Windows ESP simply because Arch needs an EFI partition. Multiple EFI bootloaders can coexist on the same ESP.

## Shrinking Windows

Use Windows Disk Management or another Windows-native method to shrink the Windows partition when practical. Leave the resulting space unallocated for Arch.

Do not run Linux partitioning commands until the exact Windows partition and target free space have been identified.

## Arch installation

Install Arch into the intended unallocated space. Mount the existing ESP at the chosen mount point without formatting it.

Before rebooting, verify:

```bash
lsblk -f
findmnt -R /
bootctl status
efibootmgr -v
```

## Fast Startup and hibernation

Fast Startup and hibernation can leave Windows filesystems in a state that is unsafe to access from Linux. Treat a hibernated Windows filesystem as unavailable for read-write Linux access until Windows has fully shut down.

## Recovery plan

Keep the Arch installation USB available. If Windows changes the UEFI boot order or an EFI entry disappears, inspect firmware entries before changing partitions:

```bash
efibootmgr -v
bootctl status
```

If the ESP itself is damaged, use the Windows recovery environment to restore Windows boot files rather than recreating partitions blindly.

## References

- ArchWiki: Dual boot with Windows
- ArchWiki: UEFI
- ArchWiki: systemd-boot
