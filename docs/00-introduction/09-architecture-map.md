---
title: Architecture Map
sidebar_label: Architecture Map
---

## Purpose

This map shows how the handbook connects the machine layers that matter during installation and recovery.

![Arch Linux Handbook architecture map](./architecture-map.svg)

## Layer model

```text
Firmware / UEFI
      ↓
EFI system partition
      ↓
Bootloader / UKI
      ↓
Kernel + initramfs + microcode
      ↓
Storage / filesystem / encryption
      ↓
systemd + services
      ↓
Network / graphics / audio / input
      ↓
Desktop / applications
```

A failure should be investigated at the lowest layer that can explain the observed symptom.

## Operational rule

### Recovery rule

### Operational sequence

STOP → CHECK → VERIFY → CONTINUE

Do not jump from a high-level symptom directly to a destructive repair. Inspect the state first, isolate one layer, make one controlled change, then verify.

## Why the layers matter

A graphical login failure can originate below the display manager. A missing root filesystem can be caused by an incorrect kernel command line or initramfs. A network application failure may be caused by DNS even when the link and IP address are healthy.

The layer model therefore acts as a common language across the installation and troubleshooting sections.

## References

- [Arch boot process](https://wiki.archlinux.org/title/Arch_boot_process)
- [systemd](https://wiki.archlinux.org/title/Systemd)
- [General recommendations](https://wiki.archlinux.org/title/General_recommendations)
