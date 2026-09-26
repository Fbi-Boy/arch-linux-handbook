---
id: 99-troubleshooting
---

# 99 — Troubleshooting

Troubleshooting is organized by failure layer.

## Decision tree
Power on fails → firmware/hardware
Live USB fails → media/firmware/graphics
Disk missing → storage/controller/firmware
Network fails → device/radio/IP/route/DNS/repository
Installed system fails → EFI/bootloader/kernel/initramfs
Graphical session fails → GPU/display manager/desktop
Device fails → driver/firmware/service/configuration

## Issue-page standard
Every issue page should contain:
- Symptom
- Scope
- Likely layer
- Diagnostic commands
- Expected output
- Confirmed causes
- Safe fixes
- Recovery
- Verification
- References

## Priority cases
Wi-Fi, DNS, pacman/GPG/mirrors, missing bootloader, missing Windows entry, kernel/initramfs, black screen, display manager, audio, Bluetooth, touchpad, brightness, suspend/resume, package-update failures, and chroot recovery.
