---
id: pre-reboot-gate
title: Pre-reboot quality gate
sidebar_label: Pre-reboot gate
---

Rebooting is a deployment event. Treat it as a quality gate.

## Filesystems

~~~bash
findmnt -R /
cat /etc/fstab
findmnt --verify --verbose
~~~

Confirm root and ESP are mounted as designed.

## Network and identity

~~~bash
systemctl is-enabled NetworkManager.service
cat /etc/hostname
id <username>
~~~

## Bootloader

~~~bash
bootctl status
efibootmgr -v
~~~

## Kernel and initramfs

~~~bash
pacman -Q linux linux-firmware
ls -lh /boot
~~~

Use `hostnamectl` and other live-system status queries after the first real boot rather than as the primary verification inside `arch-chroot`.

Inspect the ESP separately when it is mounted elsewhere.

## Exit safely

~~~bash
exit
umount -R /mnt
lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINTS
reboot
~~~

Remove the installation USB when firmware begins the next boot.

## First boot model

~~~text
Firmware
→ boot manager
→ Arch kernel
→ initramfs
→ systemd
→ login
~~~

If boot fails, return to recovery and classify the failed layer before reinstalling anything.
