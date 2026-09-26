---
id: systemd-boot
title: Configure systemd-boot
sidebar_label: systemd-boot
---

Assumptions: UEFI mode, mounted ESP, arch-chroot, and installed Linux kernel.

## Verify the ESP

~~~bash
findmnt /efi
findmnt /boot
lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINTS
~~~

Use the mount point selected by the installation architecture.

## Install

If the ESP is mounted at /efi:

~~~bash
bootctl --esp-path=/efi install
~~~

If mounted at /boot:

~~~bash
bootctl --esp-path=/boot install
~~~

## Inspect

~~~bash
bootctl status
efibootmgr -v
~~~

Confirm the intended ESP and UEFI entry.

## Loader configuration

Create ESP/loader/loader.conf:

~~~ini
default arch.conf
timeout 4
editor no
~~~

## Kernel entry

Create ESP/loader/entries/arch.conf:

~~~ini
title   Arch Linux
linux   /vmlinuz-linux
initrd  /initramfs-linux.img
options root=UUID=ROOT-UUID rw
~~~

Paths must match the actual boot layout. If microcode is a separate initramfs, it must precede the main initramfs.

## Verify

~~~bash
bootctl
bootctl list
~~~

Confirm referenced files exist.

## Recovery note

If bootctl cannot create firmware entries from a normal chroot, investigate the UEFI-variable/chroot context instead of assuming the boot manager is corrupt.

## References

- ArchWiki: systemd-boot
- ArchWiki: EFI system partition
