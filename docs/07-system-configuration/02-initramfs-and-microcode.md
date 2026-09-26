---
id: initramfs-and-microcode
title: Initramfs and CPU microcode
sidebar_label: Initramfs & microcode
---

# Initramfs and CPU microcode

The initramfs provides early userspace before the real root filesystem is available. Arch supports mkinitcpio, dracut, and booster.

## CPU microcode

AMD:

~~~bash
pacman -S amd-ucode
~~~

Intel:

~~~bash
pacman -S intel-ucode
~~~

ArchWiki recommends current CPU microcode for AMD and Intel systems because it contains processor stability and security updates.

## mkinitcpio

Configuration:

~~~text
/etc/mkinitcpio.conf
~~~

Regenerate after relevant changes:

~~~bash
mkinitcpio -P
~~~

Inspect:

~~~bash
lsinitcpio /boot/initramfs-linux.img | head
lsinitcpio --early /boot/initramfs-linux.img | grep microcode
~~~

## Hooks

Do not copy an old HOOKS array from another Arch release without checking the current configuration and documentation. LUKS, LVM, RAID, Btrfs, and early-boot keyboard requirements can change initramfs configuration.

## Boot-layer model

~~~text
UEFI firmware
    ↓
boot manager
    ↓
kernel
    ↓
initramfs
    ↓
root filesystem
    ↓
systemd
~~~

Knowing which layer failed prevents unrelated changes.

## References

- ArchWiki: mkinitcpio
- ArchWiki: Microcode
- ArchWiki: Arch boot process
