---
title: Graphics and GPU
sidebar_label: Graphics and GPU
---

## Purpose

Configure graphics by GPU vendor, kernel support, and session requirements. Avoid copying a driver recipe without first identifying the hardware.

## Identify the GPU

```bash
lspci -k | grep -A 3 -E 'VGA|3D|Display'
uname -r
```

Record the device and the kernel module in use.

## Configuration layers

Think in layers:

1. PCI device is detected.
2. Kernel driver is loaded.
3. Firmware is available when required.
4. Mesa or vendor userspace is present when required.
5. The display session can use the GPU.
6. Applications can access acceleration.

Fix the first broken layer rather than changing all six.

## Verify kernel driver

```bash
lspci -k
lsmod
journalctl -b -k | grep -Ei 'drm|gpu|firmware'
```

A driver appearing in `lsmod` is evidence of loading, not proof that acceleration is healthy.

## Verify rendering

Inside the graphical session, use the appropriate graphics-information utility available for the installed stack. Compare the reported renderer with the expected hardware.

If the renderer falls back to software, inspect kernel logs, firmware, Mesa/userspace packages, and the session configuration before changing boot parameters.

## Common failure classes

| Symptom | First investigation |
| --- | --- |
| Black screen before login | Kernel/driver/display-manager logs |
| Login succeeds but session crashes | Desktop session and user journal |
| Software rendering | GPU driver, firmware, Mesa/userspace |
| External display missing | Kernel DRM events and display session |
| Suspend/resume graphics failure | Kernel logs and GPU power-management behavior |

## Recovery

Keep a TTY path available. If a new graphics change breaks the session, revert the smallest recent change and boot with the previous known-good configuration where possible.

Do not add random kernel parameters from unrelated guides. Every parameter should have a documented purpose and a verification plan.

## Next step

After graphics works, validate audio, Bluetooth, printers, touchpads, power management, and external displays independently.

## References

- ArchWiki: Kernel mode setting
- ArchWiki: Xorg
- ArchWiki: Wayland
- ArchWiki: Hardware video acceleration
