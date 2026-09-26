---
title: Secure Boot with sbctl
---

Secure Boot protects the pre-boot trust boundary by requiring authorized EFI components. Treat it as a boot-chain project, not a single toggle.

## Before changing firmware

Record:

```bash
bootctl status
efibootmgr -v
lsblk -f
```

For Windows dual boot, preserve the Windows recovery path and recovery key before changing firmware or boot entries.

## Check status

```bash
bootctl status
```

Look for the Secure Boot state and firmware mode.

## sbctl workflow

After installing sbctl, inspect the current state before creating or enrolling keys:

```bash
sbctl status
```

A custom-key workflow generally involves:

1. enter the firmware's intended setup state;
2. create keys;
3. enroll keys;
4. sign the boot components;
5. verify signatures;
6. enable Secure Boot;
7. reboot and verify.

Do not enroll keys until the recovery path is understood.

## Verification

After configuration:

```bash
sbctl status
bootctl status
journalctl -k | grep -i "secure boot"
```

Keep a known-good recovery medium available. The official Arch installation ISO itself does not provide a normal Secure Boot boot path, so plan the recovery path before enabling enforcement.

## Stop conditions

Stop if:

- the ESP is not positively identified;
- the firmware key state is unclear;
- no recovery path exists;
- Windows dual-boot dependencies have not been documented.

## References

- https://wiki.archlinux.org/title/Sbctl
- https://wiki.archlinux.org/title/Unified_Extensible_Firmware_Interface/Secure_Boot
- https://wiki.archlinux.org/title/Systemd-boot
