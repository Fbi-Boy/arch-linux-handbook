# 06.3 — Installation Verification Checklist

## Before formatting

- [ ] Backup verified.
- [ ] Target disk identified twice.
- [ ] Existing partitions recorded.
- [ ] UEFI confirmed.
- [ ] Network verified.

## After partitioning

- [ ] EFI partition is correct.
- [ ] Root partition is correct.
- [ ] No unintended partition was formatted.
- [ ] Filesystems match the design.
- [ ] Mounts are correct.

## After base installation

- [ ] Base system exists.
- [ ] fstab generated.
- [ ] fstab UUIDs match `lsblk -f`.
- [ ] Chroot works.

## Before reboot

- [ ] Time zone configured.
- [ ] Locale generated.
- [ ] Hostname configured.
- [ ] User created.
- [ ] Network design configured.
- [ ] CPU microcode handled.
- [ ] Bootloader installed.
- [ ] EFI files present.
- [ ] Kernel/initramfs present.

## After reboot

- [ ] Arch boots.
- [ ] Login works.
- [ ] Network works.
- [ ] DNS works.
- [ ] Correct time.
- [ ] Storage mounts.
- [ ] Other OS boots if applicable.

## Quality gate

A step is not considered complete merely because a command returned without an obvious error. Each phase requires a verification test.
