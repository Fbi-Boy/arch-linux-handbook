---
id: download-and-verify
title: Download and verify the installation image
sidebar_label: Download and verify
---

Treat the ISO as a software supply-chain input. Download it from the official Arch Linux download infrastructure and verify it before writing it to removable media.

## 1. Download from the official source

Use the official download page:

https://archlinux.org/download/

Download:

- the current x86_64 ISO,
- its PGP signature,
- and, when useful, the published checksum files.

Do not treat a checksum as a substitute for signature verification. A checksum proves that a file matches a published digest; a trusted signature establishes authenticity of the signed data.

## 2. Verify the checksum

Arch publishes SHA256 and BLAKE2b values. For BLAKE2b:

```bash
b2sum -c b2sums.txt
```

The expected result for the ISO is `OK`.

For SHA256, calculate the digest and compare it with the value published by Arch:

```bash
sha256sum archlinux-YYYY.MM.DD-x86_64.iso
```

Replace the filename with the actual release filename.

## 3. Verify the PGP signature

Using GnuPG:

```bash
gpg --auto-key-locate clear,wkd --locate-external-key pierre@archlinux.org
gpg --verify archlinux-YYYY.MM.DD-x86_64.iso.sig archlinux-YYYY.MM.DD-x86_64.iso
```

The exact signing key can change with Arch release/signing-key practices, so follow the current official download page rather than copying an old fingerprint into the handbook.

## 4. Interpret the result

### Valid signature

A valid signature from the expected Arch release signing identity means the signature cryptographically verifies against the downloaded ISO.

Still confirm that the signing identity/fingerprint is the one currently published by Arch.

### Invalid signature

Stop.

Do not write the image to USB and do not boot from it until the source, signature file, and signing key have been checked.

### Checksum mismatch

Stop.

Redownload the ISO and checksum files from an official source. A mismatch can indicate corruption or an unexpected file.

## 5. Write the image

Only after verification should the image be written to USB.

On Linux, identify the USB carefully:

```bash
lsblk -o NAME,SIZE,MODEL,TRAN,MOUNTPOINTS
```

Then use an appropriate image-writing method for the detected device.

> **Critical warning:** writing an ISO directly to a block device destroys existing data on the target device.

Never replace the target device in a command until it has been independently verified.

## Verification gate

Before booting:

- [ ] ISO signature verified.
- [ ] Checksum verified where practical.
- [ ] USB target verified by model and size.
- [ ] Important USB data backed up.
- [ ] Image-writing operation completed without errors.

## References

- Official Arch Linux Downloads: https://archlinux.org/download/
- ArchWiki: Installation guide
- ArchWiki: Installation media
