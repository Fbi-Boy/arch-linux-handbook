# Boot Failure Recovery

Boot problems should be diagnosed by layer: **firmware → EFI entry → bootloader → kernel → initramfs → root filesystem → userspace**.

## 1. Classify the symptom

| Symptom | First layer to inspect |
| --- | --- |
| Firmware cannot see Arch | UEFI entry / ESP |
| Bootloader appears but entry is missing | bootloader configuration |
| Kernel starts then stops | initramfs / root discovery |
| Kernel panic | kernel / initramfs / root filesystem |
| Arch boots but desktop does not | userspace / display stack |

## 2. Enter recovery media safely

Boot the Arch installation medium in the same firmware mode used by the installed system.

Verify UEFI mode:

```bash
test -d /sys/firmware/efi && echo "UEFI mode"
```

Inventory disks before mounting:

```bash
lsblk -f
blkid
```

Do not guess the root or ESP device from its position in the list.

## 3. Mount the installed system

After positively identifying the filesystem:

```bash
mount /dev/<root-partition> /mnt
mount --mkdir /dev/<esp-partition> /mnt/efi
arch-chroot /mnt
```

Use the actual mount point from the installed system. Some installations mount the ESP at `/boot`.

Verify:

```bash
findmnt -R /
ls -la /boot
ls -la /efi 2>/dev/null
```

## 4. Inspect the boot layer

For systemd-boot:

```bash
bootctl status
efibootmgr -v
```

Inspect entries:

```bash
ls -la /efi/EFI 2>/dev/null
ls -la /boot/EFI 2>/dev/null
```

Check kernel and initramfs:

```bash
ls -lh /boot/vmlinuz*
ls -lh /boot/initramfs*
```

## 5. Repair the smallest confirmed layer

Regenerate initramfs only when evidence points to an initramfs problem:

```bash
mkinitcpio -P
```

Repair a systemd-boot installation only after positively identifying the ESP:

```bash
bootctl --esp-path=<ESP> install
bootctl status
```

Do not reinstall the bootloader merely because the desktop fails to start.

## 6. Root discovery failures

Inspect filesystem identity:

```bash
lsblk -f
blkid
cat /etc/fstab
```

Compare the UUID referenced by `/etc/fstab` and the boot entry with the actual filesystem UUID.

If they disagree, fix the configuration only after identifying which filesystem is actually intended.

## 7. Dual-boot safety

Never format an existing Windows ESP as a generic repair step.

Before changing EFI files, preserve evidence:

```bash
efibootmgr -v
find /efi -maxdepth 3 -type f 2>/dev/null | head -n 100
```

For a dual-boot machine, validate Arch and Windows independently after recovery.

## 8. Stop conditions

Stop if:

- the target disk is uncertain;
- multiple ESPs exist and the correct one cannot be identified;
- filesystem corruption is suspected;
- encryption metadata is not understood;
- the proposed repair would overwrite data without a verified backup.

**Preserve evidence before increasing the blast radius.**
