---
id: 02-installation-media
slug: /02-installation-media
---

# 02 — Installation Media

## Goal
Create a bootable Arch installation medium from an official image and verify it before use.

## Procedure
1. Download the ISO from official Arch infrastructure.
2. Obtain the matching PGP signature.
3. Verify the signature using the official procedure.
4. Write the image to the intended USB device.
5. Boot the target computer from the UEFI USB entry.

## Safety
Writing an ISO can overwrite the selected device. Identify the USB by size/model before writing it. Never guess a device path.

## Failure handling
### USB does not boot
Recreate the media, verify the ISO again, confirm UEFI boot selection, and try another USB port or drive.

### Signature verification fails
Stop. Recheck the signature source, signing key, fingerprint, and downloaded ISO. Do not install from an unverified image.

## References
https://archlinux.org/download/
https://wiki.archlinux.org/title/Installation_guide
