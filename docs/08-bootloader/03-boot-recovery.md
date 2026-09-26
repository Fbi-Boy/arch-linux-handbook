---
id: boot-recovery
title: Boot failure recovery
sidebar_label: Boot recovery
---

# Boot failure recovery

A failed boot is a diagnosis problem, not automatically a reinstall problem.

## Recovery sequence

Boot the installation medium in the same firmware mode as the installed system.

~~~bash
lsblk -f
mount /dev/<root-partition> /mnt
mount /dev/<esp-partition> /mnt/efi
findmnt -R /mnt
arch-chroot /mnt
~~~

Adjust the ESP path to the layout actually used.

## Classify the failure

### Firmware does not show Linux Boot Manager

Check UEFI mode, ESP visibility, NVRAM entry, firmware boot order, and Secure Boot state.

### Boot menu appears but Arch is missing

~~~bash
bootctl list
ls -la <ESP>/loader/entries
~~~

### Entry exists but kernel is missing

~~~bash
ls -lh <ESP>/vmlinuz-linux
ls -lh <ESP>/initramfs-linux.img
~~~

### Kernel starts but root cannot be found

~~~bash
blkid
~~~

Compare the root UUID with the boot entry. Then investigate initramfs, encryption, filesystem, storage, or kernel command-line configuration.

## Regenerate initramfs

~~~bash
mkinitcpio -P
ls -lh /boot
~~~

## Repair systemd-boot

Only after positively identifying the ESP:

~~~bash
bootctl --esp-path=<ESP> install
bootctl status
~~~

Never format the ESP merely because boot failed.

## Preserve evidence

Record UEFI entries, ESP contents, filesystem UUIDs, bootloader configuration, and relevant journal output before destructive repair.

## References

- ArchWiki: systemd-boot
- ArchWiki: Arch boot process
- ArchWiki: mkinitcpio
