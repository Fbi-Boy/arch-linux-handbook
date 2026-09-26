---
id: 03-boot
slug: /03-boot
---

# 03 — Boot and Live Environment

## Objective
Reach the Arch live environment in the intended firmware mode.

## UEFI checkpoint
Check whether /sys/firmware/efi/efivars exists. Its presence indicates the live environment was booted in UEFI mode.

If it is absent, stop and correct the firmware boot mode before continuing with a UEFI installation.

## Initial checks
- [ ] Keyboard layout
- [ ] Clock
- [ ] Network interface
- [ ] Storage devices
- [ ] Correct USB boot mode

## Failure handling
For a blank screen, verify the image, try another USB port, inspect firmware graphics settings, and consult official installation-media troubleshooting before adding kernel parameters.
