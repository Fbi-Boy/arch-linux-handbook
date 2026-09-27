# 06.1 — Complete Installation Runbook

> **Design rule:** never copy a command containing a guessed disk, interface, mount point, UUID, or partition number.

## 0. Installation gate

Before touching storage, confirm:

- [ ] Backup completed.
- [ ] Target disk identified by model and size.
- [ ] UEFI mode confirmed.
- [ ] Network available.
- [ ] Existing Windows/EFI/recovery partitions identified if dual booting.
- [ ] Installation media was verified.

## 1. Identify the environment

Run:

```bash
ls /sys/firmware/efi/efivars
```

**Expected:** directory contents are visible. If the path does not exist, reboot and select the UEFI USB entry.

Inspect hardware:

```bash
lsblk -o NAME,SIZE,TYPE,FSTYPE,FSVER,LABEL,UUID,MOUNTPOINTS,MODEL
```

Do not continue until the target disk is unambiguous.

## 2. Check network

```bash
ip link
```

For a wired connection, connect Ethernet and verify:

```bash
ping -c 3 archlinux.org
```

For wireless, use the live environment's supported wireless procedure and verify both connectivity and DNS before continuing.

## 3. Clock

Check:

```bash
timedatectl
```

Enable network time synchronization if required by the live environment:

```bash
timedatectl set-ntp true
```

Re-check:

```bash
timedatectl status
```

## 4. Partitioning

> ⚠️ **DESTRUCTIVE:** partitioning can permanently destroy data.

Do not invent the partition layout from this page. First read [partitioning strategy](../05-storage/01-partitioning-strategy.md), then use [partition and format safely](../05-storage/02-partition-and-format.md).

The storage pages deliberately require a second device check before formatting. If Windows or another OS is present, use the [dual-boot safety path](../14-dual-boot/01-windows-dual-boot-safety.md) before changing partitions.

## 5. Format and mount

Follow [partition and format safely](../05-storage/02-partition-and-format.md) from start to finish.

Do not continue until its mount verification passes:

```bash
findmnt -R /mnt
lsblk -o NAME,SIZE,FSTYPE,MOUNTPOINTS
```

## 6. Install the base system

Use the dedicated [base installation procedure](./04-base-install.md). It contains the concrete `pacstrap`, microcode, `genfstab`, and `arch-chroot` steps.

The current Arch Installation Guide documents the minimal baseline as `pacstrap -K /mnt base linux linux-firmware`; this handbook adds NetworkManager and CPU microcode according to the chosen hardware/network design.

Do not invent a package list or mix this procedure with a different installation architecture.

## 7. Enter the installed system

The base-install page ends by entering the target with:

```bash
arch-chroot /mnt
```

Then continue to [first system configuration](../07-system-configuration/01-first-system-configuration.md).

## 10. Configure time zone

Choose the correct zone from:

```bash
ls /usr/share/zoneinfo
```

Set it with the current Installation Guide procedure, then verify:

```bash
timedatectl
```

## 11. Configure locale

Edit locale configuration:

```bash
nano /etc/locale.gen
```

Uncomment the locale required by the installation.

Generate locales:

```bash
locale-gen
```

Create the default locale configuration:

```bash
echo 'LANG=en_US.UTF-8' > /etc/locale.conf
```

Replace the locale only after confirming it exists in `/etc/locale.gen`.

## 12. Configure hostname

Example:

```bash
echo 'archlinux' > /etc/hostname
```

Choose a hostname that fits the machine and local network.

## 13. Configure users

Set a root password:

```bash
passwd
```

Create a daily unprivileged user:

```bash
useradd -m <username>
passwd <username>
```

Configure administrative privilege according to the current Arch security guidance. Do not use root as the normal desktop account.

## 14. Configure networking

Install and enable one network-management design appropriate to the system. Do not enable several competing managers without a reason.

Verify after reboot that the chosen service starts and that the system can resolve DNS.

## 15. CPU microcode

Identify the CPU:

```bash
lscpu
```

Install the appropriate microcode package according to the CPU vendor and current ArchWiki instructions.

## 16. Bootloader

Choose one supported bootloader design and follow its dedicated procedure:

- systemd-boot
- GRUB

Do not mix installation instructions from different bootloaders.

Before rebooting, verify the EFI mount, kernel/initramfs files, bootloader files, and firmware boot entry.

## 17. Final pre-reboot checkpoint

Verify:

```bash
findmnt -R /
cat /etc/fstab
ls /boot
ip link
```

Then exit the chroot and unmount cleanly using the current Installation Guide procedure.

Remove the USB only after the machine is ready to boot from internal storage.

## 18. First boot

Confirm:

- [ ] Firmware finds the Arch entry.
- [ ] Kernel boots.
- [ ] Login works.
- [ ] Network works.
- [ ] Correct time is shown.
- [ ] Storage mounts correctly.
- [ ] Windows still boots if dual booting.

## Stop conditions

Stop and troubleshoot instead of continuing if:

- the wrong disk may have been modified;
- the EFI partition is unclear;
- package downloads fail;
- `fstab` does not match the actual filesystems;
- the bootloader cannot identify the target;
- important data is unexpectedly missing.

## Recovery

When the installed system does not boot, return to the verified installation medium and use [General Recovery](../99-troubleshooting/recovery.md). Do not reinstall automatically.

## References

- https://wiki.archlinux.org/title/Installation_guide
- https://wiki.archlinux.org/title/Arch-chroot
- https://wiki.archlinux.org/title/EFI_system_partition
- https://wiki.archlinux.org/title/GRUB
- https://wiki.archlinux.org/title/Systemd-boot
